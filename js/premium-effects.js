/**
 * PREMIUM EFFECTS - INTERACTIVE JAVASCRIPT
 * Natan Souza Portfolio 2.0
 * Enterprise-grade animations and interactions
 */

(function() {
    'use strict';

    // ========================================
    // 1. UTILITY FUNCTIONS
    // ========================================

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const throttle = (func, limit) => {
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
    };

    // ========================================
    // 2. NAVBAR SCROLL EFFECT
    // ========================================

    const initNavbar = () => {
        const nav = document.getElementById('premium-nav');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!nav) return;

        // Scroll behavior
        const handleScroll = throttle(() => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu on link click
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });

            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
    };

    // ========================================
    // 2.5 THEME TOGGLE (DARK/LIGHT MODE)
    // ========================================

    const initThemeToggle = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Check for saved theme preference or default to dark
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
        }

        // Toggle theme
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Save preference
            const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    };

    // ========================================
    // 3. GALAXY BACKGROUND (Removed video control)
    // ========================================
    // Galaxy effect is pure CSS, no JavaScript needed

    // ========================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ========================================

    const initScrollReveal = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Observe content cards
        const contentCards = document.querySelectorAll('.content-card');
        contentCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animationDelay = `${index * 0.15}s`;
            observer.observe(card);
        });

        // Observe sections
        const sections = document.querySelectorAll('.section-header');
        sections.forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    };

    // ========================================
    // 5. PARALLAX EFFECT
    // ========================================

    const initParallax = () => {
        const video = document.querySelector('.hero-video');
        if (!video) return;

        const handleParallax = throttle(() => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                video.style.transform = `translate(-50%, -50%) translateY(${scrolled * parallaxSpeed}px)`;
            }
        }, 16); // ~60fps

        window.addEventListener('scroll', handleParallax);
    };

    // ========================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================

    const initSmoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ========================================
    // 7. CURSOR GLOW EFFECT (DESKTOP ONLY)
    // ========================================

    const initCursorGlow = () => {
        if (window.matchMedia('(max-width: 968px)').matches) return;

        const createGlow = () => {
            const glow = document.createElement('div');
            glow.className = 'cursor-glow';
            glow.style.cssText = `
                position: fixed;
                width: 400px;
                height: 400px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 217, 255, 0.08) 0%, transparent 70%);
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
                opacity: 0;
            `;
            document.body.appendChild(glow);
            return glow;
        };

        const glow = createGlow();

        document.addEventListener('mousemove', throttle((e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.style.opacity = '1';
        }, 16));

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    };

    // ========================================
    // 8. CARD TILT EFFECT ON HOVER
    // ========================================

    const initCardTilt = () => {
        if (window.matchMedia('(max-width: 968px)').matches) return;

        const cards = document.querySelectorAll('.project-card, .content-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    };

    // ========================================
    // 9. SCROLL PROGRESS INDICATOR (DISABLED)
    // ========================================

    const initScrollProgress = () => {
        // Disabled - removed progress bar from top
    };

    // ========================================
    // 10. TYPING EFFECT FOR HERO TITLE
    // ========================================

    const initTypingEffect = () => {
        const titleLines = document.querySelectorAll('.hero-title-line');
        if (!titleLines.length) return;

        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            let charIndex = 0;
            const delay = index * 400; // Delay between lines
            
            setTimeout(() => {
                const typeInterval = setInterval(() => {
                    if (charIndex < text.length) {
                        line.textContent += text.charAt(charIndex);
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50); // Speed of typing
            }, delay);
        });
    };

    // ========================================
    // 11. STATS COUNTER ANIMATION
    // ========================================

    const initStatsCounter = () => {
        const stats = document.querySelectorAll('.stat-number');
        if (!stats.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const hasPlus = text.includes('+');
                    const number = parseInt(text.replace(/\D/g, ''));
                    
                    let current = 0;
                    const increment = number / 50; // 50 steps
                    const duration = 2000; // 2 seconds
                    const stepTime = duration / 50;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = number.toLocaleString() + (hasPlus ? '+' : '');
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(current).toLocaleString() + (hasPlus ? '+' : '');
                        }
                    }, stepTime);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    };

    // ========================================
    // 12. LAZY LOAD IMAGES
    // ========================================

    const initLazyLoad = () => {
        const images = document.querySelectorAll('img[data-src]');
        if (!images.length) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // ========================================
    // 13. PERFORMANCE OPTIMIZATION
    // ========================================

    const initPerformanceOptimizations = () => {
        // Reduce motion for users who prefer it
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-base', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const video = document.querySelector('.hero-video');
            if (document.hidden && video) {
                video.pause();
            } else if (video) {
                video.play().catch(err => console.log('Play error:', err));
            }
        });
    };

    // ========================================
    // 14. INITIALIZE ALL EFFECTS
    // ========================================

    const init = () => {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all effects
        initNavbar();
        initThemeToggle();
        // initVideoBackground() removed - using Galaxy Spiral CSS effect
        initScrollReveal();
        initParallax();
        initSmoothScroll();
        initCursorGlow();
        initCardTilt();
        initScrollProgress();
        // initTypingEffect(); // Disabled by default - enable if desired
        initStatsCounter();
        initLazyLoad();
        initPerformanceOptimizations();

        // Log initialization
        console.log('🎨 Premium effects initialized');
    };

    // Start initialization
    init();

})();
