// ===== AOS =====
AOS.init({ duration:800, once:true });

// ===== NAV MODALS =====
const buttons = document.querySelectorAll(".nav-btn");
const modals = document.querySelectorAll(".nav-modal");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        const modalId = button.dataset.modal;

        modals.forEach(modal => modal.classList.remove("active"));
        const targetModal = document.getElementById(modalId);
        targetModal.classList.toggle("active");
    });
});

document.addEventListener("click", () => {
    modals.forEach(modal => modal.classList.remove("active"));
});

    // ===== HERO SLIDESHOW =====
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function changeSlide() {
    slides[currentSlide].classList.remove("active");

    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 6000); // Change every 6 seconds