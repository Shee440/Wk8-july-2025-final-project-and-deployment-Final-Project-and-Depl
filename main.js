// Creative Agency - Enhanced Main JavaScript File
// Includes all interactive features, animations, and functionality

class CreativeAgency {
    constructor() {
        this.init();
    }

    // Initialize all functionality
    init() {
        this.setupEventListeners();
        this.createBackgroundShapes();
        this.handleNavbarScroll();
        this.createParticles();
        this.enhancedScrollAnimations();
        this.setupPortfolioFilter();
        this.setupFormValidation();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupImageLazyLoading();
        this.setupCounterAnimations();
        this.setupTypewriterEffect();
        this.setupCursorEffects();
        this.setupPreloader();
        this.setupMusicPlayer();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Mobile navigation toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                this.toggleMobileMenu(hamburger, navMenu);
            });

            // Close mobile menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu(hamburger, navMenu);
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-container')) {
                    this.closeMobileMenu(hamburger, navMenu);
                }
            });
        }

        // Loading states for buttons
        this.setupButtonLoadingStates();

        // Keyboard navigation
        this.setupKeyboardNavigation();

        // Page transitions
        this.setupPageTransitions();
    }

    // Mobile menu functionality
    toggleMobileMenu(hamburger, navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu(hamburger, navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Animated background shapes
    createBackgroundShapes() {
        const background = document.querySelector('.background-shapes');
        if (!background) return;

        const shapesCount = 8;
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4cd964', '#ffcc00'];

        for (let i = 0; i < shapesCount; i++) {
            const shape = document.createElement('div');
            shape.className = `shape shape-${i + 1}`;
            
            const size = Math.random() * 200 + 50;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.top = `${Math.random() * 100}%`;
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.background = colors[Math.floor(Math.random() * colors.length)];
            shape.style.opacity = Math.random() * 0.2 + 0.05;
            shape.style.animationDelay = `${Math.random() * 8}s`;
            shape.style.animationDuration = `${Math.random() * 10 + 5}s`;

            background.appendChild(shape);
        }
    }

    // Navbar scroll effect
    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                
                // Hide navbar on scroll down, show on scroll up
                if (window.scrollY > lastScrollY && window.scrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        });
    }

    // Particle effect for hero section
    createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particles = document.createElement('div');
        particles.className = 'particles';
        hero.appendChild(particles);

        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 4 + 2}s`;
            particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;

            particles.appendChild(particle);
        }
    }

    // Enhanced scroll animations with Intersection Observer
    enhancedScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation for child elements
                    if (entry.target.classList.contains('features-grid') || 
                        entry.target.classList.contains('portfolio-grid') ||
                        entry.target.classList.contains('services-grid')) {
                        this.animateGridItems(entry.target);
                    }
                    
                    // Start counter animations
                    if (entry.target.querySelector('.stat')) {
                        this.animateCounters(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .features-grid, .portfolio-grid, .services-grid, .stats').forEach(el => {
            observer.observe(el);
        });
    }

    // Animate grid items with staggered delay
    animateGridItems(grid) {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('fade-in');
        });
    }

    // Portfolio filtering functionality
    setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 100);
                    } else {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Form validation setup
    setupFormValidation() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(contactForm)) {
                    this.submitForm(contactForm);
                }
            });
            
            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }
    }

    // Form validation logic
    validateForm(form) {
        let isValid = true;
        const fields = ['name', 'email', 'subject', 'message'];
        
        fields.forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const errorElement = input.nextElementSibling;
        
        let isValid = true;
        let errorMessage = '';
        
        switch(input.name) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'subject':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters long';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }
        
        if (isValid) {
            input.classList.remove('error');
            errorMessage = '';
        } else {
            input.classList.add('error');
        }
        
        errorElement.textContent = errorMessage;
        return isValid;
    }

    clearError(input) {
        input.classList.remove('error');
        const errorElement = input.nextElementSibling;
        errorElement.textContent = '';
    }

    // Form submission with loading state
    async submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Message sent successfully! We will get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('Error sending message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
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
    }

    // Active navigation highlighting
    setupActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Image lazy loading
    setupImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Counter animations for statistics
    animateCounters(container) {
        const counters = container.querySelectorAll('.stat h4');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 16);
        });
    }

    // Typewriter effect for hero text
    setupTypewriterEffect() {
        const heroText = document.querySelector('.hero-content h1');
        if (!heroText) return;

        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typewriter = setInterval(() => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typewriter);
            }
        }, 100);
    }

    // Custom cursor effects
    setupCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        // Add CSS for custom cursor
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                border: 2px solid var(--primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: transform 0.1s, width 0.3s, height 0.3s;
                mix-blend-mode: difference;
            }
            .custom-cursor.hover {
                transform: translate(-50%, -50%) scale(1.5);
                background: var(--primary);
            }
        `;
        document.head.appendChild(style);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Hover effects
        document.querySelectorAll('a, button, .cta-button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Preloader animation
    setupPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-spinner"></div>
                <p>Loading Creative Agency...</p>
            </div>
        `;
        
        // Add preloader styles
        const style = document.createElement('style');
        style.textContent = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--gradient-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s, visibility 0.5s;
            }
            .preloader-content {
                text-align: center;
                color: white;
            }
            .preloader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            .preloader.hidden {
                opacity: 0;
                visibility: hidden;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(preloader);

        // Hide preloader when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 2000);
        });
    }

    // Background music player (optional)
    setupMusicPlayer() {
        const musicButton = document.createElement('button');
        musicButton.className = 'music-toggle';
        musicButton.innerHTML = '🎵';
        musicButton.title = 'Toggle Background Music';
        
        musicButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-primary);
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: var(--shadow);
            transition: transform 0.3s;
        `;

        musicButton.addEventListener('click', (e) => {
            e.stopPropagation();
            musicButton.classList.toggle('playing');
            musicButton.innerHTML = musicButton.classList.contains('playing') ? '🔇' : '🎵';
            this.toggleMusic();
        });

        document.body.appendChild(musicButton);
    }

    toggleMusic() {
        // This would integrate with a real audio API
        console.log('Music toggle functionality would go here');
    }

    // Button loading states
    setupButtonLoadingStates() {
        document.querySelectorAll('button, .cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.type === 'submit' || this.classList.contains('cta-button')) {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span class="loading-spinner"></span> Loading...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.disabled = false;
                    }, 3000);
                }
            });
        });
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes mobile menu
            if (e.key === 'Escape') {
                this.closeMobileMenu(
                    document.querySelector('.hamburger'),
                    document.querySelector('.nav-menu')
                );
            }
            
            // Space bar pauses/plays music
            if (e.key === ' ' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                document.querySelector('.music-toggle')?.click();
            }
        });
    }

    // Page transition animations
    setupPageTransitions() {
        const links = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href && !link.href.includes('javascript:')) {
                    e.preventDefault();
                    
                    // Add page transition
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s';
                    
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }
            });
        });
        
        // Reset opacity when page loads
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    // Utility function for debouncing
    debounce(func, wait) {
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

    // Utility function for throttling
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
}

// Initialize the Creative Agency when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CreativeAgency();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CreativeAgency;
}