(() => {
  const button = document.getElementById('mobileMenuButton');
  const nav = document.getElementById('mainNav');
  if (!button || !nav) return;
  const current = (location.pathname.split('/').pop() || 'index.html').replace('.html','');
  nav.querySelectorAll('a[data-page]').forEach(link => {
    if (link.dataset.page === current) link.setAttribute('aria-current','page');
  });
  function closeMenu() {
    nav.classList.remove('is-open');
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Abrir menú de navegación');
  }
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    if (open) closeMenu();
    else {
      nav.classList.add('is-open');
      button.setAttribute('aria-expanded','true');
      button.setAttribute('aria-label','Cerrar menú de navegación');
    }
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !button.contains(e.target)) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
})();
