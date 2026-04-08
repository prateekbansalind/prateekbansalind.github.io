/* ===== MOBILE MENU TOGGLE ===== */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
}

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top    = section.offsetTop - 80;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav__menu a[href="#${id}"]`);
        if (!link) return;
        if (scrollY >= top && scrollY < top + height) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

/* ===== SCROLL PROGRESS BAR ===== */
const progressBar = document.getElementById('scroll-progress');

function updateProgress() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
}

window.addEventListener('scroll', updateProgress);

/* ===== BACK TO TOP ===== */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== COPY EMAIL ===== */
const copyBtn = document.getElementById('copy-email');
const toast   = document.getElementById('toast');

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('prateekbansalind@gmail.com').then(() => {
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<i class=\'bx bx-check\'></i> Copied!';

            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = '<i class=\'bx bx-copy\'></i> Copy';
            }, 2000);
        });
    });
}

/* ===== TERMINAL TYPING ANIMATION ===== */
const terminalBody = document.getElementById('terminal-body');

const terminalLines = [
    { type: 'cmd',    html: '<span class="t-prompt">$</span> <span class="t-cmd">cat profile.json</span>' },
    { type: 'output', html: '<span class="t-output">{</span>' },
    { type: 'output', html: '<span class="t-output">&nbsp;&nbsp;<span class="t-key">"name"</span>: <span class="t-string">"Prateek Bansal"</span>,</span>' },
    { type: 'output', html: '<span class="t-output">&nbsp;&nbsp;<span class="t-key">"role"</span>: <span class="t-string">"Cloud &amp; DevOps Engineer"</span>,</span>' },
    { type: 'output', html: '<span class="t-output">&nbsp;&nbsp;<span class="t-key">"location"</span>: <span class="t-string">"New Zealand 🇳🇿"</span>,</span>' },
    { type: 'output', html: '<span class="t-output">&nbsp;&nbsp;<span class="t-key">"current"</span>: <span class="t-string">"Spark NZ"</span>,</span>' },
    { type: 'output', html: '<span class="t-output">&nbsp;&nbsp;<span class="t-key">"iac"</span>: [<span class="t-string">"Terraform"</span>, <span class="t-string">"Bicep"</span>],</span>' },
    { type: 'output', html: '<span class="t-output">&nbsp;&nbsp;<span class="t-key">"cloud"</span>: <span class="t-string">"Azure"</span>,</span>' },
    { type: 'output', html: '<span class="t-output">&nbsp;&nbsp;<span class="t-key">"interests"</span>: [<span class="t-string">"☕"</span>, <span class="t-string">"🏋️"</span>]</span>' },
    { type: 'output', html: '<span class="t-output">}</span>' },
    { type: 'cursor', html: '<span class="t-prompt">$</span> <span class="t-cursor">█</span>' },
];

function renderTerminal() {
    if (!terminalBody) return;
    terminalBody.innerHTML = '';

    terminalLines.forEach((line, i) => {
        const p = document.createElement('p');
        p.innerHTML = line.html;
        p.classList.add('t-line');
        p.style.animationDelay = `${i * 120 + 300}ms`;
        terminalBody.appendChild(p);
    });
}

renderTerminal();

/* ===== SCROLL REVEAL (IntersectionObserver) ===== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // only animate once
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll(
    '.timeline__card, .skills__category, .contact__card, .about__container, .education__card, .learning__cert-card, .learning__item, .availability'
).forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
});
