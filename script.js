document.body.classList.add('js');

const header = document.getElementById('site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = siteNav ? [...siteNav.querySelectorAll('a')] : [];

function setHeaderState() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开导航');
  siteNav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

function toggleMenu() {
  if (!menuToggle || !siteNav) return;
  const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute('aria-label', willOpen ? '关闭导航' : '打开导航');
  siteNav.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', (event) => {
  if (!siteNav || !menuToggle) return;
  if (!siteNav.classList.contains('open')) return;
  if (siteNav.contains(event.target) || menuToggle.contains(event.target)) return;
  closeMenu();
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealItems.forEach((item) => observer.observe(item));
}