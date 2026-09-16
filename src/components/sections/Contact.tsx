import { t, localizedHref, locale } from '../../lib/i18n';
import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Loader2, Mail, AlertTriangle } from 'lucide-react';
import { CONTACT, CTA, SITE } from '../../content/site';
import { cn } from '../../lib/utils';
import { EASE, viewportOnce } from '../../lib/motion';
import { Button, Eyebrow } from '../ui/primitives';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD =
  'w-full rounded-xl border border-contrast/[0.09] bg-contrast/[0.025] px-4 py-3 text-sm text-contrast placeholder:text-slate-600 transition-colors focus:border-brand-500/50 focus:bg-contrast/[0.04] focus:outline-none';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('language', locale);

    // Pot de miel : rempli uniquement par les robots.
    if (data.get('website')) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    setError('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        body: data,
        signal: controller.signal,
      });
      const payload = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!res.ok || !payload?.ok) {
        throw new Error(t("Envoi impossible pour le moment."));
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(
        controller.signal.aborted
          ? t("Le serveur n’a pas confirmé l’envoi à temps. Votre demande a peut-être été transmise.")
          : err instanceof TypeError
            ? t("La connexion au serveur a échoué. Vérifiez votre connexion Internet.")
            : err instanceof Error
              ? err.message
              : t("Envoi impossible pour le moment."),
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand-500/[0.09] blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/35 to-transparent"
      />

      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* Argumentaire */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Eyebrow>{CONTACT.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-balance font-display text-3xl font-bold leading-[1.1] tracking-[-0.035em] sm:text-[2.6rem]">
              {CTA.title}
            </h2>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-slate-400">{CTA.lead}</p>

            <ul className="mt-8 space-y-3">
              {CTA.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-jade-500/15 text-success ring-1 ring-inset ring-jade-500/25">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  <span className="text-sm text-slate-300">{b}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-contrast/[0.07] bg-contrast/[0.015] p-5">
              <p className="text-sm leading-relaxed text-slate-400">{CONTACT.lead}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                {SITE.email}
              </a>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="card p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-jade-500/15 text-success ring-1 ring-inset ring-jade-500/30">
                    <Check className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                  <h3 className="font-display text-xl font-bold text-contrast">{t("Message transmis")}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">{t("Merci. Je vous répondrai sous deux jours ouvrables, à l’adresse que vous avez indiquée.")}</p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-medium text-accent hover:text-accent"
                  >{t("Envoyer un autre message")}</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                  aria-busy={status === 'sending'}
                >
                  <h3 className="font-display text-xl font-bold text-contrast">{CONTACT.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500">{t("Votre message est adressé directement à Yassine, à")}{' '}
                    <a href={`mailto:${SITE.email}`} className="text-accent underline underline-offset-2">
                      {SITE.email}
                    </a>
                    .
                  </p>

                  {/* Pot de miel anti-robot */}
                  <div className="absolute left-[-9999px]" aria-hidden>
                    <label htmlFor="website">{t("Ne pas remplir")}</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-400">{t("Nom et prénom *")}</label>
                      <input id="name" name="name" required maxLength={120} autoComplete="name" className={FIELD} placeholder={t("Votre nom et prénom")} />
                    </div>
                    <div>
                      <label htmlFor="school" className="mb-1.5 block text-xs font-medium text-slate-400">{t("École / structure *")}</label>
                      <input id="school" name="school" required maxLength={160} autoComplete="organization" className={FIELD} placeholder={t("Nom de votre école")} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">{t("E-mail *")}</label>
                      <input id="email" name="email" type="email" required maxLength={160} autoComplete="email" className={FIELD} placeholder="vous@exemple.be" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-slate-400">{t("Téléphone")}</label>
                      <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={FIELD} placeholder={t("+32 4xx xx xx xx")} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-slate-400">{t("Sujet")}</label>
                      <select id="subject" name="subject" className={cn(FIELD, 'appearance-none')} defaultValue={CONTACT.subjects[0]}>
                        {CONTACT.subjects.map((s) => (
                          <option key={s} value={s} className="bg-ink-900">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="students" className="mb-1.5 block text-xs font-medium text-slate-400">{t("Nombre d’élèves")}</label>
                      <input id="students" name="students" type="number" min={1} step={1} inputMode="numeric" className={FIELD} placeholder="120" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-400">{t("Votre message *")}</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={5000}
                      rows={4}
                      className={cn(FIELD, 'resize-none')}
                      placeholder={t("Ce qui vous pose problème aujourd’hui, et ce que vous aimeriez améliorer.")}
                    />
                  </div>

                  <label className="group flex items-start gap-2.5 text-[11px] leading-relaxed text-slate-500">
                    <span className="relative mt-0.5 grid h-4 w-4 shrink-0 place-items-center">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-contrast/20 bg-contrast/[0.04] transition-colors checked:border-brand-500 checked:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                      />
                      <Check
                        aria-hidden
                        className="pointer-events-none absolute h-2.5 w-2.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        strokeWidth={4}
                      />
                    </span>
                    <span>{t("J’accepte que mes données soient utilisées pour traiter cette demande, conformément à la")}{' '}
                      <a href={localizedHref('/confidentialite')} className="text-accent underline underline-offset-2">{t("politique de confidentialité")}</a>
                      .
                    </span>
                  </label>

                  {status === 'error' && (
                    <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-500/25 bg-rose-500/[0.08] p-3 text-xs text-danger">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>
                        {error}{t(" Vous pouvez aussi m’écrire directement à")}{' '}
                        <a href={`mailto:${SITE.email}`} className="underline underline-offset-2">
                          {SITE.email}
                        </a>
                        .
                      </span>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />{t(" Envoi…")}</>
                    ) : (
                      <>{t("Envoyer la demande")}<ArrowRight className="icon-directional h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
