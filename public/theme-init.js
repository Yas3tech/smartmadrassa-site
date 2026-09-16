// A blocking, same-origin script applies the saved choice before the first paint.
// Keep this file external to respect the site's script-src 'self' policy.
(() => {
  let theme = 'light';
  try {
    if (localStorage.getItem('smartmadrassa-theme') === 'dark') theme = 'dark';
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#04070f' : '#faf9f6');
})();
