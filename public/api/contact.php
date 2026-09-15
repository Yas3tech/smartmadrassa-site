<?php
/**
 * SmartMadrassa — traitement du formulaire de contact.
 *
 * Hébergement mutualisé OVH : la fonction mail() est disponible et l'expéditeur
 * doit être une adresse du domaine hébergé, sans quoi le message part en spam.
 *
 * Réglages à vérifier avant mise en ligne :
 *   - DESTINATAIRE : l'adresse qui reçoit les demandes.
 *   - EXPEDITEUR   : une adresse réellement créée sur le domaine (OVH e-mail).
 */

declare(strict_types=1);

const DESTINATAIRE = 'contact@smartmadrassa.be';
const EXPEDITEUR   = 'noreply@smartmadrassa.be';
const NOM_SITE     = 'SmartMadrassa';
const MAX_PAR_HEURE = 5; // par adresse IP

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function repondre(int $code, array $data): never
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    repondre(405, ['ok' => false, 'error' => 'Méthode non autorisée.']);
}

/* --- Pot de miel : rempli uniquement par les robots ---------------------- */
if (!empty($_POST['website'])) {
    repondre(200, ['ok' => true]); // on fait semblant d'accepter
}

/* --- Limitation simple par IP ------------------------------------------- */
$ip = $_SERVER['REMOTE_ADDR'] ?? 'inconnue';
$fichierQuota = sys_get_temp_dir() . '/sm_contact_' . md5($ip) . '.txt';
$maintenant = time();
$horodatages = [];

if (is_readable($fichierQuota)) {
    $brut = (array) json_decode((string) file_get_contents($fichierQuota), true);
    $horodatages = array_filter($brut, static fn($t) => is_int($t) && $t > $maintenant - 3600);
}
if (count($horodatages) >= MAX_PAR_HEURE) {
    repondre(429, ['ok' => false, 'error' => 'Trop de messages envoyés. Réessayez dans une heure.']);
}

/* --- Récupération et validation ----------------------------------------- */
function champ(string $cle, int $max = 500): string
{
    $valeur = trim((string) ($_POST[$cle] ?? ''));
    $valeur = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $valeur); // anti-injection d'en-tête
    return mb_substr($valeur, 0, $max);
}

$nom      = champ('name', 120);
$ecole    = champ('school', 160);
$email    = champ('email', 160);
$tel      = champ('phone', 40);
$sujet    = champ('subject', 120) ?: 'Demande via le site';
$eleves   = champ('students', 20);
$message  = mb_substr(trim((string) ($_POST['message'] ?? '')), 0, 5000);
$consent  = !empty($_POST['consent']);

$erreurs = [];
if ($nom === '')                                   { $erreurs[] = 'nom'; }
if ($ecole === '')                                 { $erreurs[] = 'école'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL))    { $erreurs[] = 'e-mail'; }
if (mb_strlen($message) < 10)                      { $erreurs[] = 'message'; }
if (!$consent)                                     { $erreurs[] = 'consentement'; }

if ($erreurs) {
    repondre(422, [
        'ok' => false,
        'error' => 'Champs incomplets ou invalides : ' . implode(', ', $erreurs) . '.',
    ]);
}

/* --- Composition du message --------------------------------------------- */
$corps = <<<TXT
Nouvelle demande depuis {$_SERVER['HTTP_HOST']}

Nom            : {$nom}
École          : {$ecole}
E-mail         : {$email}
Téléphone      : {$tel}
Nombre d'élèves: {$eleves}
Sujet          : {$sujet}

----------------------------------------------------------------------
{$message}
----------------------------------------------------------------------

IP    : {$ip}
Date  :
TXT;

$corps .= date('d/m/Y H:i:s');

$sujetMail = '[' . NOM_SITE . '] ' . $sujet . ' — ' . $ecole;

$entetes = [
    'From'         => NOM_SITE . ' <' . EXPEDITEUR . '>',
    'Reply-To'     => $nom . ' <' . $email . '>',
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer'     => 'PHP/' . phpversion(),
];

$enteteBrut = '';
foreach ($entetes as $cle => $valeur) {
    $enteteBrut .= $cle . ': ' . $valeur . "\r\n";
}

$envoye = @mail(
    DESTINATAIRE,
    '=?UTF-8?B?' . base64_encode($sujetMail) . '?=',
    $corps,
    rtrim($enteteBrut),
    '-f' . EXPEDITEUR
);

if (!$envoye) {
    repondre(500, [
        'ok' => false,
        'error' => 'Le serveur n’a pas pu envoyer le message.',
    ]);
}

/* --- Mise à jour du quota ------------------------------------------------ */
$horodatages[] = $maintenant;
@file_put_contents($fichierQuota, json_encode(array_values($horodatages)));

repondre(200, ['ok' => true]);
