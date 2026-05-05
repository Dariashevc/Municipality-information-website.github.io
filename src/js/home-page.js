// ===== AOS =====
AOS.init({ duration: 800, once: true });

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }
});

// ===== NAV MODALS =====
const buttons = document.querySelectorAll(".nav-btn");
const modals = document.querySelectorAll(".nav-modal");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        const modalId = button.dataset.modal;
        const targetModal = document.getElementById(modalId);
        const isActive = targetModal.classList.contains("active");

        modals.forEach(modal => modal.classList.remove("active"));

        if (!isActive) {
            targetModal.classList.add("active");
        }
    });
});

document.addEventListener("click", () => {
    modals.forEach(modal => modal.classList.remove("active"));
});

// ===== HERO SLIDESHOW =====
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index));
    });
});

if (slides.length > 0) {
    setInterval(nextSlide, 6000);
}