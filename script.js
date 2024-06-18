// Selecting the menu icon and navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggling the menu icon and navbar on click
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Selecting all sections and navigation links
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Handling scroll event
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Adding 'active' class to the navigation link corresponding to the current section
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Toggling the 'sticky' class on the header based on scroll position
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Resetting the menu icon and navbar
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Initializing ScrollReveal library
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Revealing elements with specified origin
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Initializing Typed.js library
const typed = new Typed('.multiple-text', {
    strings: ['CSAI Sophomore at IIITD', 'Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Handling form submission
let contactForm = document.getElementById('contact-form');

contactForm.onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission

    // Fetch API to send form data to Google Apps Script endpoint
    fetch('https://script.google.com/macros/s/AKfycbwTb36MTP9llw3LWg3QPnPUgOcRDZjC5oh1mSlP4g5VhmI3aKUFaMuULF_zyvIZ31NyUQ/exec', {
        method: 'POST',
        body: new FormData(contactForm)
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset(); // Reset form fields
        } else {
            throw new Error('Failed to send message.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message. Please try again later.');
    });
};