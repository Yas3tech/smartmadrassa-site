import { motion } from 'framer-motion';
import {
  Check,
  X,
  Clock,
  FileCheck2,
  Download,
  Send,
  Megaphone,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';

const viewport = { once: true, amount: 0.4 } as const;

/* ------------------------------------------------------------------ */
/* Atomes partagés                                                     */
/* ------------------------------------------------------------------ */

function Kpi({
  label,
  value,
  delta,
  tone = 'slate',
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: 'brand' | 'jade' | 'red' | 'slate';
}) {
  const tones = {
    brand: 'text-brand-300',
    jade: 'text-jade-300',
    red: 'text-rose-300',
    slate: 'text-slate-200',
  };
  return (
    <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5">
      <div className="text-[9px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className={cn('mt-1 font-display text-lg font-bold leading-none', tones[tone])}>{value}</div>
      {delta && <div className="mt-1 text-[9px] text-slate-500">{delta}</div>}
    </div>
  );
}

function Avatar({ initials, tone = 'brand' }: { initials: string; tone?: 'brand' | 'jade' | 'sky' | 'violet' }) {
  const tones = {
    brand: 'from-brand-400 to-brand-600',
    jade: 'from-jade-400 to-jade-600',
    sky: 'from-sky-400 to-sky-600',
    violet: 'from-violet-400 to-violet-600',
  };
  return (
    <span
      className={cn(
        'grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[8px] font-bold text-white',
        tones[tone],
      )}
    >
      {initials}
    </span>
  );
}

function Bar({ value, tone = 'brand', delay = 0 }: { value: number; tone?: 'brand' | 'jade' | 'violet'; delay?: number }) {
  const tones = {
    brand: 'from-brand-500 to-brand-400',
    jade: 'from-jade-600 to-jade-400',
    violet: 'from-violet-600 to-violet-400',
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        className={cn('h-full rounded-full bg-gradient-to-r', tones[tone])}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={viewport}
        transition={{ duration: 1.1, ease: EASE, delay }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Tableau de bord                                                  */
/* ------------------------------------------------------------------ */

const WEEK = [62, 78, 55, 90, 72, 84, 68];

export function DashboardScreen() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Kpi label="Élèves" value="248" delta="+12 cette année" tone="slate" />
        <Kpi label="Présents" value="94 %" delta="aujourd’hui" tone="jade" />
        <Kpi label="Absences" value="14" delta="dont 9 justifiées" tone="brand" />
        <Kpi label="Bulletins" value="72 %" delta="période 2" tone="slate" />
      </div>

      <div className="grid gap-2 sm:grid-cols-[1.4fr_1fr]">
        <div className="ui-pane">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-300">Présence — 7 derniers jours</span>
            <span className="inline-flex items-center gap-1 text-[9px] text-jade-300">
              <TrendingUp className="h-2.5 w-2.5" /> +3,2 %
            </span>
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {WEEK.map((v, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-brand-600/70 to-brand-400"
                initial={{ height: 0 }}
                whileInView={{ height: `${v}%` }}
                viewport={viewport}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
              />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[8px] text-slate-600">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
              <span key={i} className="flex-1 text-center">
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="ui-pane">
          <div className="mb-2 text-[10px] font-semibold text-slate-300">Prochains cours</div>
          <div className="space-y-1.5">
            {[
              ['09:00', 'Arabe — 3A', 'brand'],
              ['10:30', 'Coran — 2B', 'jade'],
              ['13:15', 'Sciences — 4A', 'sky'],
            ].map(([time, label, tone]) => (
              <div key={label} className="flex items-center gap-2 rounded-md bg-white/[0.03] px-2 py-1.5">
                <span className="font-mono text-[9px] text-slate-500">{time}</span>
                <span className="truncate text-[10px] text-slate-300">{label}</span>
                <span
                  className={cn(
                    'ml-auto h-1.5 w-1.5 rounded-full',
                    tone === 'brand' && 'bg-brand-400',
                    tone === 'jade' && 'bg-jade-400',
                    tone === 'sky' && 'bg-sky-400',
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Appel & présences                                                */
/* ------------------------------------------------------------------ */

const ROLL = [
  { name: 'Amina Benali', initials: 'AB', status: 'present' },
  { name: 'Youssef Haddad', initials: 'YH', status: 'present' },
  { name: 'Lina De Smet', initials: 'LD', status: 'late' },
  { name: 'Omar Cherkaoui', initials: 'OC', status: 'absent' },
  { name: 'Sara Vermeulen', initials: 'SV', status: 'present' },
  { name: 'Ilyas Mansouri', initials: 'IM', status: 'present' },
] as const;

function StatusPills({ status, delay }: { status: string; delay: number }) {
  const options = [
    { key: 'present', Icon: Check, on: 'bg-jade-500 text-white', label: 'Présent' },
    { key: 'absent', Icon: X, on: 'bg-rose-500 text-white', label: 'Absent' },
    { key: 'late', Icon: Clock, on: 'bg-amber-500 text-white', label: 'Retard' },
  ];
  return (
    <div className="flex gap-1">
      {options.map(({ key, Icon, on, label }) => {
        const active = key === status;
        return (
          <motion.span
            key={key}
            aria-label={label}
            className={cn(
              'grid h-5 w-5 place-items-center rounded-md transition-colors',
              active ? on : 'bg-white/[0.05] text-slate-600',
            )}
            initial={active ? { scale: 0.6, opacity: 0 } : false}
            whileInView={active ? { scale: 1, opacity: 1 } : undefined}
            viewport={viewport}
            transition={{ duration: 0.35, ease: EASE, delay }}
          >
            <Icon className="h-2.5 w-2.5" strokeWidth={3} />
          </motion.span>
        );
      })}
    </div>
  );
}

export function AttendanceScreen() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="ui-chip bg-brand-500/15 text-brand-300 ring-1 ring-inset ring-brand-500/25">
          Classe 3A
        </span>
        <span className="ui-chip bg-white/[0.04] text-slate-400">Arabe — 09:00</span>
        <span className="ui-chip bg-white/[0.04] text-slate-400">Lun. 16 sept.</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[9px] text-jade-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jade-400" /> Synchronisé
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Kpi label="Effectif" value="24" tone="slate" />
        <Kpi label="Présents" value="21" tone="jade" />
        <Kpi label="Absents" value="2" tone="red" />
        <Kpi label="Retards" value="1" tone="brand" />
      </div>

      <div className="ui-pane space-y-1">
        {ROLL.map((s, i) => (
          <motion.div
            key={s.name}
            className="flex items-center gap-2 rounded-md px-1.5 py-1.5 odd:bg-white/[0.02]"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
          >
            <Avatar initials={s.initials} tone={i % 2 ? 'jade' : 'brand'} />
            <span className="truncate text-[10px] text-slate-300">{s.name}</span>
            <span className="ml-auto">
              <StatusPills status={s.status} delay={0.3 + i * 0.07} />
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[9px] font-semibold text-white">
          Valider l’appel
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] px-2.5 py-1 text-[9px] text-slate-400">
          <Download className="h-2.5 w-2.5" /> Export Excel
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Notes                                                            */
/* ------------------------------------------------------------------ */

const GRADES = [
  { name: 'Amina Benali', initials: 'AB', scores: ['18', '16', '17'], avg: '17,0' },
  { name: 'Youssef Haddad', initials: 'YH', scores: ['14', '15', '13'], avg: '14,0' },
  { name: 'Lina De Smet', initials: 'LD', scores: ['12', '17', '15'], avg: '14,7' },
  { name: 'Omar Cherkaoui', initials: 'OC', scores: ['16', '—', '18'], avg: '17,0' },
  { name: 'Sara Vermeulen', initials: 'SV', scores: ['19', '18', '19'], avg: '18,7' },
];

export function GradesScreen() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="ui-chip bg-jade-500/15 text-jade-300 ring-1 ring-inset ring-jade-500/25">
          Arabe — 3A
        </span>
        <span className="ui-chip bg-white/[0.04] text-slate-400">Période 2</span>
        <span className="ml-auto ui-chip bg-white/[0.04] text-slate-400">Moyenne classe 16,3</span>
      </div>

      <div className="ui-pane overflow-hidden p-0">
        <div className="grid grid-cols-[1.6fr_repeat(3,1fr)_0.9fr] gap-1 border-b border-white/[0.07] px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
          <span>Élève</span>
          <span className="text-center">Interro.</span>
          <span className="text-center">Devoir</span>
          <span className="text-center">Examen</span>
          <span className="text-right">Moy.</span>
        </div>
        {GRADES.map((row, i) => (
          <motion.div
            key={row.name}
            className="grid grid-cols-[1.6fr_repeat(3,1fr)_0.9fr] items-center gap-1 px-3 py-1.5 odd:bg-white/[0.02]"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <Avatar initials={row.initials} tone={i % 2 ? 'jade' : 'brand'} />
              <span className="truncate text-[10px] text-slate-300">{row.name}</span>
            </span>
            {row.scores.map((s, j) => (
              <span
                key={j}
                className={cn(
                  'mx-auto w-8 rounded-md py-0.5 text-center font-mono text-[10px]',
                  s === '—'
                    ? 'text-slate-600'
                    : Number(s.replace(',', '.')) >= 16
                      ? 'bg-jade-500/12 text-jade-300'
                      : Number(s.replace(',', '.')) >= 12
                        ? 'bg-white/[0.05] text-slate-300'
                        : 'bg-rose-500/12 text-rose-300',
                )}
              >
                {s}
              </span>
            ))}
            <span className="text-right font-mono text-[10px] font-semibold text-white">{row.avg}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 text-[9px]">
        {[
          ['Interrogations', 30],
          ['Devoirs', 30],
          ['Examen', 40],
        ].map(([label, weight], i) => (
          <div key={label as string} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-slate-400">{label}</span>
              <span className="font-semibold text-slate-200">{weight} %</span>
            </div>
            <Bar value={weight as number} tone="jade" delay={i * 0.12} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Bulletins                                                        */
/* ------------------------------------------------------------------ */

const CLASSES = [
  { name: 'Classe 1A', done: 100, teacher: 'S. Haddadi' },
  { name: 'Classe 2B', done: 100, teacher: 'N. El Moussaoui' },
  { name: 'Classe 3A', done: 76, teacher: 'K. Berrada' },
  { name: 'Classe 4A', done: 42, teacher: 'M. Janssens' },
];

export function BulletinScreen() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="ui-chip bg-violet-500/15 text-violet-300 ring-1 ring-inset ring-violet-500/25">
          Période 2 · 2025-2026
        </span>
        <span className="ui-chip bg-white/[0.04] text-slate-400">Clôture le 20 déc.</span>
      </div>

      <div className="ui-pane space-y-2.5">
        {CLASSES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.09 }}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[10px] font-medium text-slate-200">{c.name}</span>
              <span className="text-[9px] text-slate-600">{c.teacher}</span>
              <span
                className={cn(
                  'ml-auto ui-chip',
                  c.done === 100
                    ? 'bg-jade-500/15 text-jade-300'
                    : c.done >= 70
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-rose-500/15 text-rose-300',
                )}
              >
                {c.done === 100 ? (
                  <>
                    <FileCheck2 className="h-2.5 w-2.5" /> Prêt
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-2.5 w-2.5" /> {c.done} %
                  </>
                )}
              </span>
            </div>
            <Bar value={c.done} tone={c.done === 100 ? 'jade' : 'violet'} delay={i * 0.09} />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/[0.06] p-2.5">
        <FileCheck2 className="h-3.5 w-3.5 shrink-0 text-violet-300" />
        <span className="text-[10px] text-slate-300">
          2 classes sur 4 sont prêtes à être publiées.
        </span>
        <span className="ml-auto shrink-0 rounded-md bg-violet-500 px-2.5 py-1 text-[9px] font-semibold text-white">
          Publier
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Communication                                                    */
/* ------------------------------------------------------------------ */

const THREAD = [
  { from: 'them', name: 'Mme Benali', initials: 'MB', text: 'Bonjour, Amina sera absente vendredi (rendez-vous médical).' },
  { from: 'me', name: 'Direction', initials: 'YE', text: 'Bonjour, c’est noté — l’absence sera marquée comme justifiée.' },
  { from: 'them', name: 'Mme Benali', initials: 'MB', text: 'Merci beaucoup, bonne journée.' },
];

export function CommsScreen() {
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_0.85fr]">
      <div className="ui-pane flex flex-col gap-2">
        <div className="flex items-center gap-2 border-b border-white/[0.07] pb-2">
          <Avatar initials="MB" tone="sky" />
          <div className="min-w-0">
            <div className="truncate text-[10px] font-medium text-slate-200">Mme Benali</div>
            <div className="text-[9px] text-slate-600">Parent · Amina, 3A</div>
          </div>
        </div>

        {THREAD.map((m, i) => (
          <motion.div
            key={i}
            className={cn('flex max-w-[86%] gap-1.5', m.from === 'me' && 'ml-auto flex-row-reverse')}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.18 }}
          >
            <Avatar initials={m.initials} tone={m.from === 'me' ? 'brand' : 'sky'} />
            <p
              className={cn(
                'rounded-xl px-2.5 py-1.5 text-[10px] leading-snug',
                m.from === 'me'
                  ? 'rounded-tr-sm bg-brand-500/90 text-white'
                  : 'rounded-tl-sm bg-white/[0.06] text-slate-300',
              )}
            >
              {m.text}
            </p>
          </motion.div>
        ))}

        <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/[0.07] bg-ink-950/60 px-2.5 py-1.5">
          <span className="text-[10px] text-slate-600">Écrire un message…</span>
          <Send className="ml-auto h-3 w-3 text-brand-400" />
        </div>
      </div>

      <div className="ui-pane space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-300">
          <Megaphone className="h-3 w-3 text-brand-400" /> Nouvelle annonce
        </div>
        <div className="rounded-lg border border-white/[0.07] bg-ink-950/60 p-2">
          <div className="text-[10px] font-medium text-slate-200">Réunion de parents — 12 octobre</div>
          <p className="mt-1 text-[9px] leading-relaxed text-slate-500">
            Chers parents, la réunion se tiendra le samedi 12 octobre à 14 h dans la grande salle…
          </p>
        </div>
        <div className="space-y-1">
          <div className="text-[9px] uppercase tracking-wider text-slate-600">Destinataires</div>
          {[
            ['Tous les parents', true],
            ['Enseignants', false],
            ['Élèves', false],
          ].map(([label, on]) => (
            <div key={label as string} className="flex items-center gap-2">
              <span
                className={cn(
                  'grid h-3 w-3 place-items-center rounded-[3px]',
                  on ? 'bg-brand-500' : 'border border-white/15',
                )}
              >
                {on && <Check className="h-2 w-2 text-white" strokeWidth={4} />}
              </span>
              <span className="text-[10px] text-slate-400">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-jade-500/10 px-2 py-1.5 text-[9px] text-jade-300">
          <Check className="h-2.5 w-2.5" /> 186 e-mails seront envoyés
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Finances                                                         */
/* ------------------------------------------------------------------ */

const PAYMENTS = [
  { name: 'Amina Benali', initials: 'AB', amount: '180 €', status: 'Payé' },
  { name: 'Youssef Haddad', initials: 'YH', amount: '90 / 180 €', status: 'Partiel' },
  { name: 'Lina De Smet', initials: 'LD', amount: '180 €', status: 'Payé' },
  { name: 'Omar Cherkaoui', initials: 'OC', amount: '0 / 180 €', status: 'En attente' },
];

const STATUS_TONE: Record<string, string> = {
  'Payé': 'bg-jade-500/15 text-jade-300',
  Partiel: 'bg-amber-500/15 text-amber-300',
  'En attente': 'bg-rose-500/15 text-rose-300',
};

export function FinanceScreen() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <Kpi label="Encaissé" value="32 400 €" delta="année 2025-2026" tone="jade" />
        <Kpi label="Restant dû" value="4 860 €" delta="27 familles" tone="brand" />
        <Kpi label="Recouvrement" value="87 %" delta="+6 pts vs 2024" tone="slate" />
      </div>

      <div className="ui-pane overflow-hidden p-0">
        <div className="grid grid-cols-[1.6fr_1fr_0.9fr_auto] gap-2 border-b border-white/[0.07] px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
          <span>Élève</span>
          <span>Minerval</span>
          <span>Statut</span>
          <span className="sr-only">Reçu</span>
        </div>
        {PAYMENTS.map((p, i) => (
          <motion.div
            key={p.name}
            className="grid grid-cols-[1.6fr_1fr_0.9fr_auto] items-center gap-2 px-3 py-1.5 odd:bg-white/[0.02]"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <Avatar initials={p.initials} tone={i % 2 ? 'jade' : 'brand'} />
              <span className="truncate text-[10px] text-slate-300">{p.name}</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">{p.amount}</span>
            <span className={cn('ui-chip w-fit', STATUS_TONE[p.status])}>{p.status}</span>
            <Download className="h-3 w-3 text-slate-600" />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5">
        <Download className="h-3.5 w-3.5 shrink-0 text-brand-400" />
        <span className="text-[10px] text-slate-400">
          Reçu PDF à l’en-tête de l’école, généré pour chaque règlement.
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Écran mobile — appel                                                */
/* ------------------------------------------------------------------ */

export function PhoneAttendanceScreen() {
  return (
    <div className="space-y-2.5 px-3 pb-3 pt-2">
      <div>
        <div className="text-[9px] text-slate-500">Lundi 16 septembre</div>
        <div className="font-display text-[13px] font-semibold text-white">Arabe — 3A</div>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {[
          ['21', 'Présents', 'text-jade-300'],
          ['2', 'Absents', 'text-rose-300'],
          ['1', 'Retards', 'text-amber-300'],
        ].map(([v, l, c]) => (
          <div key={l} className="rounded-lg bg-white/[0.04] p-1.5 text-center">
            <div className={cn('font-display text-sm font-bold', c)}>{v}</div>
            <div className="text-[8px] text-slate-500">{l}</div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {ROLL.slice(0, 5).map((s, i) => (
          <motion.div
            key={s.name}
            className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-2 py-2"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.08 }}
          >
            <Avatar initials={s.initials} tone={i % 2 ? 'jade' : 'brand'} />
            <span className="truncate text-[10px] text-slate-300">{s.name}</span>
            <span className="ml-auto">
              <StatusPills status={s.status} delay={0.35 + i * 0.08} />
            </span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 py-2 text-center text-[10px] font-semibold text-white">
        Valider l’appel
      </div>
    </div>
  );
}

export const SCREENS = {
  attendance: AttendanceScreen,
  grades: GradesScreen,
  bulletin: BulletinScreen,
  comms: CommsScreen,
  finance: FinanceScreen,
  dashboard: DashboardScreen,
} as const;

export const SCREEN_META: Record<
  keyof typeof SCREENS,
  { nav: string; title: string; subtitle: string }
> = {
  dashboard: { nav: 'dashboard', title: 'Tableau de bord', subtitle: 'Vue direction — année 2025-2026' },
  attendance: { nav: 'attendance', title: 'Appel & présences', subtitle: 'Marquer la présence — cours du jour' },
  grades: { nav: 'grades', title: 'Notes', subtitle: 'Saisie par matière — Arabe, période 2' },
  bulletin: { nav: 'bulletin', title: 'Bulletins', subtitle: 'Avancement et publication par classe' },
  comms: { nav: 'comms', title: 'Messages & annonces', subtitle: 'Canal officiel de l’école' },
  finance: { nav: 'finance', title: 'Finances', subtitle: 'Minerval et cotisations — 2025-2026' },
};
