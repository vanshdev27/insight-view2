// Performance optimization: Use requestAnimationFrame for smooth animations
let ticking = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePreloader();
    initializeCustomCursor();
    initializeNavigation();
    initializeHero3D();
    initializeTechSphere();
    initializeAnimations();
    initializeSwiper();
    initializeFormHandlers();
    initializeScrollEffects();
});

// Preloader functionality
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    const loadingSteps = [
        'Initializing Advanced Analytics...',
        'Loading AI Models...',
        'Connecting to Data Sources...',
        'Optimizing Performance...',
        'Ready to Launch!'
    ];
    
    let currentStep = 0;
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.style.overflow = 'visible';
                
                // Initialize AOS after preloader
                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 100,
                    easing: 'ease-out-cubic'
                });
                
                // Start hero animations
                startHeroAnimations();
            }, 500);
        }
        
        loadingProgress.style.width = progress + '%';
        
        if (progress > (currentStep + 1) * 20 && currentStep < loadingSteps.length - 1) {
            currentStep++;
            loadingText.textContent = loadingSteps[currentStep];
        }
    }, 100);
}

// Custom cursor functionality
function initializeCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth cursor outline animation
    function animateCursorOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursorOutline);
    }
    animateCursorOutline();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .program-card, .testimonial-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                lastScrollTop = scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero 3D background
function initializeHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create geometric shapes
    const geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0x0066ff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    camera.position.z = 15;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.002;
        
        torusKnot.rotation.x += 0.005;
        torusKnot.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    });
}

// Tech sphere 3D animation
function initializeTechSphere() {
    const canvas = document.getElementById('tech-sphere-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(400, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create sphere with wireframe
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x0066ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Create orbiting particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 8;
    
    function animate() {
        requestAnimationFrame(animate);
        
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.01;
        
        particlesMesh.rotation.x -= 0.002;
        particlesMesh.rotation.y += 0.003;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Hero animations
function startHeroAnimations() {
    // Animate hero stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        setTimeout(updateCounter, 1000);
    });
    
    // Animate hero title with GSAP
    if (typeof gsap !== 'undefined') {
        gsap.from('.title-line', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5
        });
        
        gsap.from('.hero-description', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.2
        });
        
        gsap.from('.hero-buttons .btn', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 1.5
        });
    }
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('program-card')) {
                    animateProgramCard(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.program-card, .feature-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Program card animation
function animateProgramCard(card) {
    if (typeof gsap !== 'undefined') {
        gsap.from(card.querySelector('.program-icon'), {
            duration: 0.8,
            scale: 0,
            rotation: 180,
            ease: 'back.out(1.7)'
        });
        
        gsap.from(card.querySelectorAll('.feature-tag'), {
            duration: 0.6,
            x: -20,
            opacity: 0,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power2.out'
        });
    }
}

// Initialize Swiper
function initializeSwiper() {
    // Testimonials Swiper
    const testimonialSwiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

// Form handlers
function initializeFormHandlers() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Certificate verification
    const verifyBtn = document.querySelector('.verify-btn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', handleCertificateVerification);
    }
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Certificate verification handler
function handleCertificateVerification() {
    const input = document.querySelector('.verify-input');
    const result = document.getElementById('verify-result');
    const btn = document.querySelector('.verify-btn');
    
    const certificateId = input.value.trim();
    
    if (!certificateId) {
        showVerificationResult('Please enter a certificate ID', 'error');
        return;
    }
    
    // Show loading state
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
    btn.disabled = true;
    
    // Simulate verification
    setTimeout(() => {
        // Mock verification logic
        if (certificateId.startsWith('IV-2024-')) {
            showVerificationResult(`
                <div class="verification-success">
                    <i class="fas fa-check-circle"></i>
                    <h4>Certificate Verified!</h4>
                    <p><strong>Certificate ID:</strong> ${certificateId}</p>
                    <p><strong>Issued to:</strong> John Doe</p>
                    <p><strong>Program:</strong> Data Analytics Mastery</p>
                    <p><strong>Issue Date:</strong> March 15, 2024</p>
                    <p><strong>Status:</strong> Valid</p>
                </div>
            `, 'success');
        } else {
            showVerificationResult('Certificate not found. Please check the ID and try again.', 'error');
        }
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 2000);
}

// Show verification result
function showVerificationResult(message, type) {
    const result = document.getElementById('verify-result');
    result.innerHTML = message;
    result.className = `verify-result ${type}`;
    result.style.display = 'block';
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto close
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.hero-bg');
                
                parallaxElements.forEach(element => {
                    const speed = 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Add scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-progress-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress-bar"></div>';
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(0, 0, 0, 0.1);
        z-index: 9999;
    `;
    
    const progressBar = scrollIndicator.querySelector('.scroll-progress-bar');
    progressBar.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #0066ff, #00d4ff);
        width: 0%;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(scrollIndicator);
    
    // Update scroll progress
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #0066ff, #00d4ff);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 102, 255, 0.3);
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px) scale(1.1)';
        backToTop.style.boxShadow = '0 8px 25px rgba(0, 102, 255, 0.4)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0) scale(1)';
        backToTop.style.boxShadow = '0 4px 15px rgba(0, 102, 255, 0.3)';
    });
}

// Button ripple effect
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

monitorPerformance();

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
// Add this JavaScript to your existing JS file

document.addEventListener("DOMContentLoaded", function () {
  const cursorCircle = document.createElement("div");
  cursorCircle.id = "cursor-circle";
  document.body.appendChild(cursorCircle);

  document.addEventListener("mousemove", function (e) {
    cursorCircle.style.left = `${e.clientX}px`;
    cursorCircle.style.top = `${e.clientY}px`;
  });

  const hoverElements = document.querySelectorAll("a, button, .btn, .nav-link");
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorCircle.style.background = "rgba(0, 212, 255, 0.4)";
    });
    el.addEventListener("mouseleave", () => {
      cursorCircle.style.background = "rgba(0, 212, 255, 0.15)";
    });
  });

  // Footer update
  const footer = document.querySelector("footer .container p");
  if (footer) {
    footer.innerHTML = "&copy; 2025 Insight View By VANSH DEV. All rights reserved.";
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const openBtn = document.getElementById("openLogin");
  const closeBtn = document.getElementById("closeLogin");

  openBtn.addEventListener("click", () => loginModal.classList.add("show"));
  closeBtn.addEventListener("click", () => loginModal.classList.remove("show"));

  // Optional: Close when clicking outside modal content
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.remove("show");
  });

  // Example form submission (replace with real logic as needed)
  document.querySelector(".login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Logged in successfully (Demo)");
    loginModal.classList.remove("show");
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const openLoginBtn = document.getElementById("openLogin");
  const closeLoginBtn = document.getElementById("closeLogin");

  openLoginBtn.addEventListener("click", () => loginModal.classList.add("show"));
  closeLoginBtn.addEventListener("click", () => loginModal.classList.remove("show"));

  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.remove("show");
  });

  document.querySelector(".login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login successful (Demo Only)");
    loginModal.classList.remove("show");
  });
});
