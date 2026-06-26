// Selecting the menu icon and navbar
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

// Toggling the menu icon and navbar on click (mobile layout)
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Selecting all sections and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

// Handling scroll event for active link highlighting
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
                const targetLink = document.querySelector('header nav a[href*=' + id + ']');
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            });
        }
    });

    // Resetting the mobile menu icon and navbar when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Dark/Light Theme Switcher Logic
const themeToggleBtn = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme = savedTheme || (systemDark ? 'dark' : 'light');

// Apply initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggleBtn.onclick = () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon(currentTheme);
};

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'bx bx-sun';
    } else {
        themeIcon.className = 'bx bx-moon';
    }
}

// Collapsible BibTeX Display Box
document.querySelectorAll('.bibtex-trigger').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.publication-card');
        const bibtexBox = card.querySelector('.bibtex-box');
        bibtexBox.classList.toggle('show');
    });
});

// Copy BibTeX Content to Clipboard
document.querySelectorAll('.copy-bibtex-btn').forEach(button => {
    button.addEventListener('click', () => {
        const preElement = button.nextElementSibling;
        const codeText = preElement.querySelector('code').innerText;
        
        navigator.clipboard.writeText(codeText).then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = "<i class='bx bx-check'></i> Copied!";
            setTimeout(() => {
                button.innerHTML = originalHTML;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy BibTeX: ', err);
        });
    });
});

// Publication Category Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const pubCards = document.querySelectorAll('.publication-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        pubCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
            } else {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// Initializing ScrollReveal library (Professional & Smooth transitions)
ScrollReveal({
    distance: '40px',
    duration: 1200,
    delay: 150
});

// Revealing elements
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .news-timeline, .publications-list, .experience-container, .projects-grid, .achievements-container, .contact-box', { origin: 'bottom' });

// ScrollReveal configuration complete