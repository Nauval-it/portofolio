
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
            const opened = menu.classList.toggle("active");
            hamburger.classList.toggle("active");
            // accessibility: announce state
            hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
            overlay.classList.toggle('active');
            const firstLink = menu.querySelector('a');
            if (opened && firstLink) {
                firstLink.classList.add('highlight');
                try { firstLink.focus({ preventScroll: true }); } catch(e) { firstLink.focus(); }
            } else if (firstLink) {
                firstLink.classList.remove('highlight');
            }
    });
    
    overlay.addEventListener('click', function() {
        toggleMenu();
    });
    
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});