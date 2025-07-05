// instate Website JavaScript
// Handles all interactive functionality and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeChartAnimations();
    initializeFormHandling();
    initializeParallaxEffects();
    initializeSmoothScrolling();
    initializeCounters();
    initializeForecastCharts();
});

// Loading Screen Animation
function initializeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    let progress = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after animation completes
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Start page animations
                startPageAnimations();
            }, 500);
        }
        
        loadingProgress.style.width = progress + '%';
    }, 150);
}

// Navigation Scroll Effects
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll effects
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Add scrolled class to navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
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
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('value-item')) {
                    animateValueCard(entry.target);
                } else if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                } else if (entry.target.classList.contains('benefit-item')) {
                    animateBenefitCard(entry.target);
                } else if (entry.target.classList.contains('dashboard-card')) {
                    animateDashboardCard(entry.target);
                } else if (entry.target.classList.contains('forecast-card')) {
                    animateForecastCard(entry.target);
                } else if (entry.target.classList.contains('feature-item')) {
                    animateFeatureItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.glass-card, .section-title, .section-subtitle, .stat-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Chart Animations
function initializeChartAnimations() {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                
                if (chart.classList.contains('market-chart')) {
                    animateMarketChart(chart);
                } else if (chart.classList.contains('hni-chart')) {
                    animateHNIChart(chart);
                } else if (chart.classList.contains('returns-chart')) {
                    animateReturnsChart(chart);
                } else if (chart.classList.contains('dashboard-chart')) {
                    animateDashboardChart(chart);
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all charts
    const charts = document.querySelectorAll('.market-chart, .hni-chart, .returns-chart, .dashboard-chart');
    charts.forEach(chart => chartObserver.observe(chart));
}

// Counter Animations
function initializeCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter); // Only animate once
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all stat numbers
    const counters = document.querySelectorAll('.stat-number, .stat-value, .stat-growth, .stat-price');
    counters.forEach(counter => counterObserver.observe(counter));
}

// Forecast Charts Animation
function initializeForecastCharts() {
    const forecastObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target.querySelector('svg path');
                if (chart) {
                    animateForecastLine(chart);
                }
                forecastObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observe all forecast charts
    const forecastCharts = document.querySelectorAll('.forecast-chart');
    forecastCharts.forEach(chart => forecastObserver.observe(chart));
}

// Specific Animation Functions
function animateMarketChart(chart) {
    const line = chart.querySelector('.chart-line');
    const dots = chart.querySelectorAll('.chart-dot');
    
    if (line) {
        line.style.animation = 'drawLine 2s ease-in-out forwards';
    }
    
    // Animate dots with delay
    dots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.animation = 'fadeInDot 0.5s ease-in-out forwards';
        }, 500 + (index * 300));
    });
}

function animateHNIChart(chart) {
    const bars = chart.querySelectorAll('.bar-chart');
    
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animation = 'growBar 1s ease-in-out forwards';
        }, index * 200);
    });
}

function animateReturnsChart(chart) {
    const ring = chart.querySelector('.progress-ring-fill');
    const text = chart.querySelector('.progress-text');
    
    if (ring) {
        ring.style.animation = 'fillRing 2s ease-in-out forwards';
    }
    
    if (text) {
        animateNumber(text, 0, 20, 2000, '%');
    }
}

function animateDashboardChart(chart) {
    const path = chart.querySelector('path');
    if (path) {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength + ' ' + pathLength;
        path.style.strokeDashoffset = pathLength;
        path.style.animation = 'drawDashboardLine 2s ease-in-out forwards';
    }
}

function animateForecastLine(path) {
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;
    path.style.animation = 'drawForecastLine 3s ease-in-out forwards';
}

// Card Animation Functions
function animateValueCard(card) {
    card.style.animation = 'slideInUp 0.8s ease-out forwards';
}

function animateServiceCard(card) {
    card.style.animation = 'slideInUp 0.8s ease-out forwards';
    
    // Animate service features
    const features = card.querySelectorAll('.service-features li');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.animation = 'fadeInLeft 0.5s ease-out forwards';
        }, 300 + (index * 100));
    });
}

function animateBenefitCard(card) {
    card.style.animation = 'slideInUp 0.8s ease-out forwards';
    
    const icon = card.querySelector('.benefit-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.animation = 'bounceIn 0.6s ease-out forwards';
        }, 200);
    }
}

function animateDashboardCard(card) {
    card.style.animation = 'slideInUp 0.8s ease-out forwards';
    
    // Animate stats
    const stats = card.querySelectorAll('.stat-growth, .stat-price');
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = 'fadeInScale 0.5s ease-out forwards';
        }, 400 + (index * 200));
    });
}

function animateForecastCard(card) {
    card.style.animation = 'slideInUp 0.8s ease-out forwards';
}

function animateFeatureItem(item) {
    item.style.animation = 'slideInRight 0.8s ease-out forwards';
    
    const icon = item.querySelector('.feature-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.animation = 'rotateIn 0.6s ease-out forwards';
        }, 200);
    }
}

// Counter Animation
function animateCounter(element) {
    const text = element.textContent;
    const value = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    if (isNaN(value)) return;
    
    const suffix = text.replace(/[0-9.]/g, '');
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    
    let currentValue = 0;
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        currentValue += stepValue;
        
        if (currentStep >= steps) {
            currentValue = value;
            clearInterval(timer);
        }
        
        // Format based on suffix
        if (suffix.includes('M')) {
            element.textContent = '£' + currentValue.toFixed(0) + 'M+';
        } else if (suffix.includes('%')) {
            element.textContent = currentValue.toFixed(1) + '%';
        } else if (suffix.includes('+')) {
            element.textContent = Math.floor(currentValue) + '+';
        } else if (suffix.includes('K')) {
            element.textContent = '₹' + currentValue.toFixed(0) + 'K/sq ft';
        } else if (suffix.includes('YoY')) {
            element.textContent = '+' + currentValue.toFixed(1) + '% YoY';
        } else {
            element.textContent = Math.floor(currentValue) + suffix;
        }
    }, stepDuration);
}

// Animate numbers counting up
function animateNumber(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        if (suffix === '%') {
            element.textContent = `${current}-${Math.min(current + 8, end)}%`;
        } else {
            element.textContent = current + suffix;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add floating label effect
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', () => {
            control.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', () => {
            if (!control.value.trim()) {
                control.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on page load
        if (control.value.trim()) {
            control.parentElement.classList.add('focused');
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    
    // Validate required fields
    if (!formValues.name || !formValues.email || !formValues.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove focused class from form groups
        const formGroups = e.target.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('focused'));
        
    }, 2000);
}

// Parallax Effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.01}deg)`;
        });
    });
}

// Page Animations on Load
function startPageAnimations() {
    // Animate hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, 300);
    }
    
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, 600);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-16) var(--space-24);
        color: var(--color-text);
        font-weight: var(--font-weight-medium);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform var(--duration-normal) var(--ease-standard);
        box-shadow: var(--shadow-lg);
        max-width: 300px;
        backdrop-filter: blur(20px);
    `;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--color-success)';
        notification.style.background = 'rgba(var(--color-success-rgb), 0.1)';
        notification.style.color = 'var(--color-success)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--color-error)';
        notification.style.background = 'rgba(var(--color-error-rgb), 0.1)';
        notification.style.color = 'var(--color-error)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add CSS animations dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes rotateIn {
            0% {
                opacity: 0;
                transform: rotate(-200deg);
            }
            100% {
                opacity: 1;
                transform: rotate(0);
            }
        }
        
        @keyframes drawLine {
            to { stroke-dashoffset: 0; }
        }
        
        @keyframes drawDashboardLine {
            to { stroke-dashoffset: 0; }
        }
        
        @keyframes drawForecastLine {
            to { stroke-dashoffset: 0; }
        }
        
        @keyframes fadeInDot {
            to { opacity: 1; }
        }
        
        @keyframes growBar {
            to { transform: scaleY(1); }
        }
        
        @keyframes fillRing {
            to { stroke-dashoffset: 113; }
        }
        
        .animate-in {
            animation-fill-mode: both;
        }
        
        .notification {
            animation: slideInRight 0.3s ease-out forwards;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize animation styles
addAnimationStyles();

// Performance optimizations
function optimizePerformance() {
    // Optimize scroll events
    const optimizedScroll = throttle(() => {
        updateScrollAnimations();
    }, 16);
    
    window.addEventListener('scroll', optimizedScroll);
    
    // Optimize resize events
    const optimizedResize = debounce(() => {
        recalculateLayout();
    }, 250);
    
    window.addEventListener('resize', optimizedResize);
}

function updateScrollAnimations() {
    const scrollY = window.scrollY;
    
    // Update parallax elements
    const parallaxElements = document.querySelectorAll('.floating-card');
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.01}deg)`;
    });
}

function recalculateLayout() {
    // Recalculate any layout-dependent animations
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        // Reset any transforms or positions that might need recalculation
        card.style.transform = '';
    });
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
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

// Initialize performance optimizations
optimizePerformance();

// Add intersection observer for lazy loading
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Initialize lazy loading
initializeLazyLoading();

// Add error handling for animations
window.addEventListener('error', (e) => {
    console.warn('Animation error:', e.error);
    // Fallback for animation errors
    document.body.classList.add('no-animations');
});

// Add CSS fallback for no animations
const noAnimationStyle = document.createElement('style');
noAnimationStyle.textContent = `
    .no-animations * {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
    }
`;
document.head.appendChild(noAnimationStyle);

// Theme Detection and Handling
function initializeThemeHandling() {
    // Detect system theme preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
        }
    });
    
    // Set initial theme
    if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
    } else {
        document.documentElement.setAttribute('data-color-scheme', 'light');
    }
}

// Initialize theme handling
initializeThemeHandling();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeLoading,
        initializeNavigation,
        initializeMobileMenu,
        initializeScrollAnimations,
        initializeChartAnimations,
        initializeFormHandling,
        showNotification
    };
}