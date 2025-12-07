document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    // Buat overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Fungsi toggle yang lengkap
    function toggleMenu() {
        const opened = menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Accessibility
        hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
        
        // Focus management
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
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = opened ? 'hidden' : 'auto';
    }
    
    // Hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Overlay click
    overlay.addEventListener('click', function() {
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Menu links click
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            toggleMenu();
        }
    });
});