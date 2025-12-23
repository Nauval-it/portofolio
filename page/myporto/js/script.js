function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    function toggleMenu() {
        const opened = menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        
        hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');

        if (opened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
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
}

function setupLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.id = 'loadingScreen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loader"></div>
            <h2 class="loading-text" data-lang='loading'></h2>
        </div>
    `;
    document.body.prepend(loadingScreen);
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            animateElements();
        }, 800);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupLoadingScreen();
    
    setupHamburgerMenu();
    
    renderPortfolio(portfolioData);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            filterByButton(filterType);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('.socialmedia a').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterContent();
        });
    }
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

window.filterContent = filterContent;