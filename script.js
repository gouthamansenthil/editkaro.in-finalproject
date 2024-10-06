// Portfolio Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxVideo = lightbox.querySelector('video');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            portfolioItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

   
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video'); 
            openLightbox(videoSrc); 
        });
    });

   
    function openLightbox(videoSrc) {
        lightbox.style.display = 'flex'; 
        lightboxVideo.src = videoSrc; 
        lightboxVideo.play(); 
    }

    // Close the lightbox
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none'; 
            lightboxVideo.pause(); 
            lightboxVideo.src = ''; 
        }
    });

// Email Subscription Form Submission
const emailForm = document.getElementById('email-form');

if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailForm.email.value;

        // Simple email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        fetch('https://script.google.com/macros/s/AKfycbw0yYwbfEvXRM3Fz5sImjf9eSxw3O-c19FpobWziu3GkTjihbwg9n3j8BnZ6rQaxheMAg/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            console.log('Response Status:', response.status); 
            if (response.ok) {
                alert('Thank you for subscribing!');
                emailForm.reset();
            } else {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Network response was not ok.');
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your subscription. Please try again.'); 
        });
    });
}

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                phone: contactForm.phone.value,
                message: contactForm.message.value
            };

            fetch('https://script.google.com/macros/s/AKfycbyQG1Adp-uL6TRXPM9-DhXFt9KNaRIgDORdDERpMaO647pmDSDZep7wMr-KGPAKE2c4VA/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Your message has been sent!');
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
