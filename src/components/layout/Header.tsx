import { t, localizedHref } from '../../lib/i18n';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV, SITE } from '../../content/site';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';
import { useActiveSection, useScrolled } from '../../lib/hooks';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/primitives';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelect } from '../ui/LanguageSelect';

const SECTION_IDS = NAV.map((n) => n.href.replace('#', ''));

/** Jauge de progression de lecture, collée en haut de la fenêtre. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-jade-400"
    />
  );
}

export function Header() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = useActiveSection(SECTION_IDS);
  const isHome = pathname === '/';

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-40"
      >
        <div
          className={cn(
            'mx-auto mt-3 flex w-[min(1200px,calc(100%-1.5rem))] items-center gap-2 rounded-2xl px-3 py-2.5 transition-colors duration-300 sm:px-4',
            scrolled
              ? 'border border-contrast/10 bg-ink-950/95 shadow-header'
              : 'border border-transparent bg-transparent',
          )}
        >
          <Link to={localizedHref('/')} aria-label={`${SITE.name} — ${t('accueil')}`} className="shrink-0">
            <Logo className="[&_.logo-wordmark]:hidden min-[400px]:[&_.logo-wordmark]:inline [&_.logo-wordmark]:text-[13px] sm:[&_.logo-wordmark]:text-[17px]" />
          </Link>

          <nav className="mx-auto hidden items-center gap-1 xl:flex">
            {NAV.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = isHome && active === id;
              return (
                <a
                  key={item.href}
                  href={isHome ? item.href : localizedHref(`/${item.href}`)}
                  className={cn(
                    'relative rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors',
                    isActive ? 'text-contrast' : 'text-slate-400 hover:text-contrast',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-contrast/[0.07] ring-1 ring-inset ring-contrast/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-1.5 xl:ms-0">
            <LanguageSelect />
            <ThemeToggle />
            <a
              href={SITE.appUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium text-slate-300 transition-colors hover:text-contrast md:inline-flex"
            >{t("Se connecter")}<ArrowUpRight className="icon-directional h-3.5 w-3.5" />
            </a>
            <Button href={isHome ? '#contact' : '/#contact'} className="hidden sm:inline-flex">{t("Demander une démo")}</Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("Fermer le menu") : t("Ouvrir le menu")}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-contrast/10 bg-contrast/[0.03] text-contrast xl:hidden"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 overflow-y-auto bg-ink-950/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="flex min-h-full flex-col justify-center gap-1 px-8 pb-8 pt-24">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={isHome ? item.href : localizedHref(`/${item.href}`)}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE }}
                  className="border-b border-contrast/[0.06] py-4 font-display text-2xl font-semibold text-contrast"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="mt-8 flex flex-col gap-3"
              >
                <Button href={isHome ? '#contact' : '/#contact'} size="lg" onClick={() => setOpen(false)}>{t("Demander une démo")}</Button>
                <Button href={SITE.appUrl} variant="outline" size="lg" external>{t("Se connecter")}</Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
