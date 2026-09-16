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
const EXPEDITEUR   = 'contact@smartmadrassa.be';
const NOM_SITE     = 'SmartMadrassa';
const MAX_PAR_HEURE = 5; // par adresse IP

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function repondre(int $code, array $data): never
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    repondre(405, ['ok' => false, 'error' => 'Méthode non autorisée.']);
}

/* --- Origine de la requête ----------------------------------------------
 * Le formulaire n'a pas de session, donc pas de jeton CSRF à valider : il n'y
 * a aucun état utilisateur à détourner. Ce qu'on veut écarter, c'est le
 * formulaire posté depuis un autre domaine, qui sert à relayer du spam.
 * Origin est envoyé par tous les navigateurs sur une requête POST ; Referer
 * sert de repli. Une requête sans ni l'un ni l'autre vient d'un outil, pas
 * d'un navigateur : on la refuse.
 */
$origines = [];
foreach (['HTTP_ORIGIN', 'HTTP_REFERER'] as $cle) {
    if (!empty($_SERVER[$cle])) {
        $hote = parse_url((string) $_SERVER[$cle], PHP_URL_HOST);
        if ($hote !== null && $hote !== false) { $origines[] = strtolower($hote); }
    }
}

// L'hôte du serveur lui-même est toujours accepté : cela couvre le domaine de
// production, un éventuel domaine de préproduction et le serveur PHP local
// lancé pour tester le formulaire, sans liste à tenir à jour. Le port ne fait
// pas partie de la comparaison — Origin n'en porte pas toujours.
$hoteServeur = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
$hoteServeur = (string) parse_url('http://' . $hoteServeur, PHP_URL_HOST);
$hotesAutorises = array_filter(['smartmadrassa.be', 'www.smartmadrassa.be', 'localhost', $hoteServeur]);

if (!$origines || !array_intersect($origines, $hotesAutorises)) {
    repondre(403, ['ok' => false, 'error' => 'Origine de la requête non autorisée.']);
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
    header('Retry-After: 3600');
    repondre(429, ['ok' => false, 'error' => 'Trop de messages envoyés. Réessayez dans une heure.']);
}

/* La tentative est comptée tout de suite, avant même la validation : sinon un
 * robot qui envoie des charges invalides à la chaîne n'est jamais freiné. */
$horodatages[] = $maintenant;
@file_put_contents($fichierQuota, json_encode(array_values($horodatages)), LOCK_EX);

/* --- Récupération et validation ----------------------------------------- */
function champ(string $cle, int $max = 500): string
{
    $brut = $_POST[$cle] ?? '';
    $valeur = is_string($brut) ? trim($brut) : '';
    $valeur = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $valeur); // anti-injection d'en-tête
    return mb_substr($valeur, 0, $max);
}

$nom      = champ('name', 120);
$ecole    = champ('school', 160);
$email    = champ('email', 160);
$tel      = champ('phone', 40);
$sujet    = champ('subject', 120) ?: 'Demande via le site';
$eleves   = champ('students', 20);
$messageBrut = $_POST['message'] ?? '';
$message  = is_string($messageBrut) ? mb_substr(trim($messageBrut), 0, 5000) : '';
$consent  = ($_POST['consent'] ?? '') === 'on';

$erreurs = [];
if ($nom === '')                                   { $erreurs[] = 'nom'; }
if ($ecole === '')                                 { $erreurs[] = 'école'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL))    { $erreurs[] = 'e-mail'; }
if (mb_strlen($message) < 10)                      { $erreurs[] = 'message'; }
if ($eleves !== '' && !preg_match('/^[1-9][0-9]*$/', $eleves)) { $erreurs[] = 'nombre d’élèves'; }
if (!$consent)                                     { $erreurs[] = 'consentement'; }

if ($erreurs) {
    repondre(422, [
        'ok' => false,
        'error' => 'Champs incomplets ou invalides : ' . implode(', ', $erreurs) . '.',
    ]);
}

/* --- Composition du message --------------------------------------------- */
$corps = <<<TXT
Nouvelle demande depuis le site SmartMadrassa

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
    'Reply-To'     => '=?UTF-8?B?' . base64_encode($nom) . '?= <' . $email . '>',
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

repondre(200, ['ok' => true]);
