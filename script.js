// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') &&
        !e.target.closest('.nav-links') &&
        !e.target.closest('.mobile-menu-btn')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});


// Counter animation
const counters = document.querySelectorAll('.counter');
const duration = 2000; // Total duration in milliseconds (increase this number to make it slower)
const fps = 30; // Frames per second
const framesTotal = (duration / 1000) * fps;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        let frame = 0;

        const animate = () => {
            frame++;
            // Using easeOutQuad easing function for smoother animation
            const progress = -1 * (frame / framesTotal) * (frame / framesTotal - 2);
            current = Math.round(progress * target);

            if (frame <= framesTotal) {
                counter.innerText = current;
                setTimeout(animate, 1000 / fps);
            } else {
                counter.innerText = target;
            }
        };

        animate();
    });
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelector('.hero-stats').querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateOnScroll.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.feature-card, .price-card, .security-item').forEach(element => {
    animateOnScroll.observe(element);
});

// Dynamic cursor effect
const hero = document.querySelector('.hero');
let mouseX = 0;
let mouseY = 0;

hero.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const globe = document.querySelector('.globe-animation');
    const rect = hero.getBoundingClientRect();
    const x = (mouseX - rect.left) / rect.width;
    const y = (mouseY - rect.top) / rect.height;

    globe.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`;
});

// Feature cards hover effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', (e) => {
        const icon = card.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Pricing cards interaction
document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'scale(1.02)';
            card.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.2)';
        }
    });

    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;

    const globe = document.querySelector('.globe-animation');
    globe.style.transform = `translateY(${scrolled * 0.2}px)`;
});