document.addEventListener('DOMContentLoaded', function() {
    
    // ========== HAMBURGER MENU ==========
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    if (hamburger && menu) {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        function toggleMenu() {
            const opened = menu.classList.toggle('active');
            hamburger.classList.toggle('active');
            overlay.classList.toggle('active');
            
            hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
            
            const firstLink = menu.querySelector('a');
            if (opened && firstLink) {
                firstLink.classList.add('highlight');
                try { 
                    firstLink.focus({ preventScroll: true }); 
                } catch(e) { 
                    firstLink.focus(); 
                }
            } else if (firstLink) {
                firstLink.classList.remove('highlight');
            }
            
            document.body.style.overflow = opened ? 'hidden' : 'auto';
        }
        
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        overlay.addEventListener('click', function() {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', function() {
                if (menu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && menu.classList.contains('active')) {
                toggleMenu();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                
                document.querySelectorAll('.animate-on-scroll').forEach(element => {
                    element.classList.add('animate__animated', 'animate__fadeInUp');
                });
            }, 1000); 
        });
    }

    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll, .animate-card');
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollY;
            const elementVisible = 150;
            
            if (scrollY > elementTop - windowHeight + elementVisible) {
                element.classList.add('animated');
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        }
        
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }
    }
    
    if (document.querySelector('.animate-on-scroll, .animate-card, .scroll-progress, #backToTop')) {
        window.addEventListener('scroll', handleScrollAnimations);
        window.addEventListener('load', handleScrollAnimations);
    }
    
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('nav')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.about-container, .project-card');
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translateY(${rate * 0.05}px)`;
        });
    }
    
    if (document.querySelector('.about-container, .project-card')) {
        window.addEventListener('scroll', handleParallax);
        window.addEventListener('load', handleParallax);
    }
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)'; // Reduced from -10px
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    setTimeout(() => {
        handleScrollAnimations();
        handleParallax();
    }, 100);
    
    console.log('✅ All scripts loaded successfully');
});

const validPages = [
    '/',
    '/index.html',
    '/page/myporto/myporto.html',
    '/page/error404/error404.html',
    '/css/style.css',
    '/js/script.js',
    '/assets/'
];

function checkPageValidity() {
    const currentPath = window.location.pathname;
    const currentUrl = window.location.href;
    
    if (currentPath.match(/\.(css|js|jpg|png|svg|ico)$/i)) {
        return;
    }
    
    const isValid = validPages.some(page => 
        currentPath === page || 
        currentPath.startsWith(page) ||
        currentUrl.includes(page)
    );
    
    if (!isValid && currentPath !== '/page/error404/error404.html' && !currentPath.includes('404.html')) {
        console.log('Redirecting to 404:', currentPath);
        window.location.href = '/page/error404/error404.html';
    }
}

window.addEventListener('load', checkPageValidity);

window.addEventListener('popstate', checkPageValidity);


