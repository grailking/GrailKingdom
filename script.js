// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Highlight active navigation item
    const navLinks = document.querySelectorAll('.castle-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroSection.style.opacity = 1 - scrolled / 600;
    }
});

// Add castle tower animation on load
window.addEventListener('load', function() {
    const towers = document.querySelectorAll('.tower');
    towers.forEach((tower, index) => {
        tower.style.animation = `towerRise 0.8s ease ${index * 0.2}s backwards`;
    });
});

// Add CSS animation for tower rise (injected via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes towerRise {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .castle-nav a.active {
        background: var(--castle-dark);
        color: var(--castle-cream);
    }
`;
document.head.appendChild(style);

// Console message for visitors
console.log('%c🏰 Welcome to Grail Kingdom! 🏰', 'font-size: 20px; color: #FFD700; font-weight: bold;');
console.log('%cWhere collectors become royalty', 'font-size: 14px; color: #81283C; font-style: italic;');
