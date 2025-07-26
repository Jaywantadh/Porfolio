// Luxury Portfolio JavaScript - Interactive Features

class LuxuryPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupCursor();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupNavigation();
        this.setupContactForm();
        this.setupParallaxEffects();
        this.setupHoverEffects();
    }

    // Custom Cursor Effects
    setupCursor() {
        const cursor = document.getElementById('cursor-follower');
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile || !cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow animation
        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .glass-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(1.5)';
                cursor.style.background = 'var(--color-luxury-clay)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                cursor.style.background = 'var(--color-luxury-red)';
            });
        });
    }

    // Scroll Animations & Intersection Observer
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class to elements that should animate
        const animateElements = document.querySelectorAll('.glass-card, .project-card, .skill-category');
        animateElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });

        // Parallax effect for hero shapes
        this.setupParallax();
    }

    // Parallax Effects
    setupParallax() {
        const shapes = document.querySelectorAll('.shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            shapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Enhanced Parallax Effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Animated Skill Bars
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkillBar = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    
                    // Animate the skill bar
                    setTimeout(() => {
                        skillBar.style.width = width + '%';
                        skillBar.classList.add('animate');
                    }, 200);
                    
                    observer.unobserve(skillBar);
                }
            });
        };

        const skillObserver = new IntersectionObserver(animateSkillBar, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Smooth Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.navbar');
        
        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.15)';
                navbar.style.backdropFilter = 'blur(25px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        });

        // Active navigation highlighting
        this.highlightActiveNav();
    }

    // Active Navigation Highlighting
    highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
    }

    // Contact Form Handling
    setupContactForm() {
        const form = document.querySelector('.form');
        
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Simulate form submission with animation
            this.handleFormSubmission(form, data);
        });

        // Enhanced form field animations
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('focus', () => {
                control.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', () => {
                if (!control.value) {
                    control.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Form Submission Handler
    handleFormSubmission(form, data) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'var(--color-text-secondary)';
        
        // Simulate API call
        setTimeout(() => {
            // Success animation
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'var(--color-success)';
            
            // Create success message
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
            
        }, 2000);
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Styles for notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            background: type === 'success' ? 'var(--color-success)' : 'var(--color-info)',
            color: 'white',
            borderRadius: 'var(--radius-base)',
            boxShadow: 'var(--shadow-luxury)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s var(--ease-luxury)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Hover Effects Enhancement
    setupHoverEffects() {
        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.02) translateY(-10px)';
                card.style.boxShadow = 'var(--shadow-luxury-hover)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) translateY(0)';
                card.style.boxShadow = '';
            });
        });

        // Button ripple effect
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                // Ripple styles
                Object.assign(ripple.style, {
                    position: 'absolute',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.3)',
                    transform: 'scale(0)',
                    animation: 'ripple 0.6s linear',
                    pointerEvents: 'none'
                });
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation CSS
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                .btn {
                    overflow: hidden;
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Stats Animation
class StatsAnimation {
    constructor() {
        this.animateStats();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.countUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    countUp(element) {
        const target = parseInt(element.textContent);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 40);
    }
}

// Typing Animation for Hero
class TypingAnimation {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, delayBetweenWords = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetweenWords = delayBetweenWords;
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        
        if (element) {
            this.type();
        }
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.currentText = currentWord.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentText === currentWord) {
            typeSpeed = this.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.throttle = this.throttle.bind(this);
        this.debounce = this.debounce.bind(this);
        this.optimizeScrollEvents();
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    optimizeScrollEvents() {
        // Replace direct scroll listeners with throttled versions
        const optimizedScroll = this.throttle(() => {
            // Scroll-dependent animations here
        }, 16); // ~60fps

        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio functionality
    new LuxuryPortfolio();
    
    // Initialize stats animation
    new StatsAnimation();
    
    // Initialize performance optimizer
    new PerformanceOptimizer();
    
    // Add typing animation to hero subtitle if needed
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const roles = [
            'Backend Developer',
            'Systems Architect', 
            'Data Analyst',
            'Golang Expert'
        ];
        // Optional: Uncomment to enable typing animation
        // new TypingAnimation(heroSubtitle, roles);
    }

    // Add loading animation
    const addLoadingAnimation = () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    };
    
    addLoadingAnimation();
});

// Handle resize events
window.addEventListener('resize', () => {
    // Recalculate positions and sizes if needed
    const isMobile = window.innerWidth <= 768;
    const cursor = document.getElementById('cursor-follower');
    
    if (cursor) {
        cursor.style.display = isMobile ? 'none' : 'block';
    }
});

// Preload animations and optimize
const preloadAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        * {
            will-change: auto;
        }
        .glass-card:hover,
        .project-card:hover,
        .btn:hover {
            will-change: transform, box-shadow;
        }
    `;
    document.head.appendChild(style);
};

preloadAnimations();