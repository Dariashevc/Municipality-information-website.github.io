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

// ===== LEAFLET MAP =====
var map = L.map('map').setView([51.0447, -114.0719], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([51.0447, -114.0719])
    .addTo(map)
    .bindPopup('<b>City Hall</b><br>Welcome to City!')
    .openPopup();
