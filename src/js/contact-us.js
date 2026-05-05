// ===== CONTACT FORM — AJAX SUBMIT =====
const form = document.getElementById('contact-form');
const statusBox = document.getElementById('form-status');
const submitBtn = form ? form.querySelector('.send-btn') : null;

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable button while sending
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        statusBox.className = 'form-status hidden';
        statusBox.textContent = '';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            statusBox.textContent = result.message;

            if (result.status === 'success') {
                statusBox.className = 'form-status success';
                form.reset();
            } else {
                statusBox.className = 'form-status error';
            }
        } catch (err) {
            statusBox.className = 'form-status error';
            statusBox.textContent = 'Something went wrong. Please try again.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
            statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}
