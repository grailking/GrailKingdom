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

// Throttle function for performance optimization
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Observe all sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Combined scroll handler with throttling
    const navLinks = document.querySelectorAll('.castle-nav a');
    const heroSection = document.querySelector('.hero-section');
    
    const handleScroll = throttle(function() {
        const scrolled = window.pageYOffset;
        
        // Highlight active navigation item
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrolled >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Parallax effect for hero section
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroSection.style.opacity = 1 - scrolled / 600;
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
});

// Add castle tower animation on load
window.addEventListener('load', function() {
    const towers = document.querySelectorAll('.tower');
    towers.forEach((tower, index) => {
        tower.style.animation = `towerRise 0.8s ease ${index * 0.2}s backwards`;
    });
});



// Console message for visitors
console.log('%c🏰 Welcome to Grail Kingdom! 🏰', 'font-size: 20px; color: #FFD700; font-weight: bold;');
console.log('%cWhere collectors become royalty', 'font-size: 14px; color: #81283C; font-style: italic;');
