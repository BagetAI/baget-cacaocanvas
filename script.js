document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlist-form');
    const messageDiv = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                email: formData.get('email'),
                name: formData.get('name'),
                signup_date: new Date().toISOString().split('T')[0]
            };

            // Disable button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Joining...';
            messageDiv.textContent = '';
            messageDiv.className = 'form-message';

            try {
                const response = await fetch('https://app.baget.ai/api/public/databases/62c9f3fc-0c6a-4851-9ff4-71272443b908/rows', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data }),
                });

                if (response.ok) {
                    messageDiv.textContent = 'Welcome to the collection. We will be in touch soon.';
                    messageDiv.classList.add('success');
                    form.reset();
                    submitBtn.textContent = 'Joined';
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                messageDiv.textContent = 'Something went wrong. Please try again.';
                messageDiv.classList.add('error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Secure Access';
            }
        });
    }

    // Simple scroll reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.step, .hero-content, .editorial-quote').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Add visible class styling
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
