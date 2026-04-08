/* Mobile menu */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
}
document.querySelectorAll('.nav__link').forEach(l =>
    l.addEventListener('click', () => navMenu.classList.remove('show'))
);

/* Scroll progress */
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    if (bar) bar.style.width = pct + '%';
});

/* Back to top */
const btn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
});
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Scroll reveal */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity    = '1';
            e.target.style.transform  = 'translateY(0)';
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.cert-card').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = `opacity 0.45s ease ${i * 100}ms, transform 0.45s ease ${i * 100}ms`;
    observer.observe(el);
});
