import { t } from '../../lib/i18n';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'smartmadrassa-theme';

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#04070f' : '#faf9f6');
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      const next = event.newValue === 'dark' ? 'dark' : 'light';
      applyTheme(next);
      setTheme(next);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const label = theme === 'light' ? t("Activer le mode sombre") : t("Activer le mode clair");
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        const next = theme === 'light' ? 'dark' : 'light';
        applyTheme(next);
        setTheme(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* The toggle still works without storage. */ }
      }}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-contrast/10 bg-ink-900/80 text-slate-300 transition-colors hover:border-brand-500/40 hover:text-accent"
    >
      {theme === 'light' ? <Moon className="h-4 w-4" aria-hidden /> : <Sun className="h-4 w-4" aria-hidden />}
    </button>
  );
}
