// File: /js/ultimate-404.js
(function() {
    console.log('⚡ ULTIMATE 404 Redirect Loaded');
    
    // DAFTAR ABSOLUT SEMUA HALAMAN YANG ADA
    const ALL_VALID_PAGES = [
        '/',
        '/index.html',
        '/page/myporto/myporto.html',
        '/404.html'
        // Tambahkan SEMUA file HTML lain yang ada
    ];
    
    // FUNGSI UTAMA
    function ultimatePageCheck() {
        const currentPath = window.location.pathname;
        console.log('📍 Current path:', currentPath);
        
        // 1. CEK JIKA SUDAH DI 404
        if (currentPath.includes('404.html')) {
            console.log('✅ Already on 404 page');
            return;
        }
        
        // 2. CEK JIKA INI FILE ASSET
        const isAsset = /\.(css|js|jpg|png|gif|svg|ico|woff|ttf|json|xml)$/i.test(currentPath);
        if (isAsset) {
            console.log('📁 Asset file, skipping');
            return;
        }
        
        // 3. CEK JIKA PATH ADA DI DAFTAR
        const isListed = ALL_VALID_PAGES.some(page => {
            // Exact match
            if (currentPath === page) return true;
            // Match tanpa .html
            if (currentPath === page.replace('.html', '')) return true;
            // Match dengan trailing slash
            if (currentPath === page + '/') return true;
            if (currentPath + '/' === page) return true;
            return false;
        });
        
        console.log('📋 Is page listed?', isListed);
        
        // 4. JIKA TIDAK ADA DI DAFTAR, REDIRECT
        if (!isListed) {
            console.log('❌ Page not in valid list, REDIRECTING...');
            doRedirect();
        } else {
            console.log('✅ Page is valid');
        }
    }
    
    function doRedirect() {
        // TUNGGU 1 DETIK LALU REDIRECT
        setTimeout(() => {
            const redirectUrl = '/404.html?from=' + 
                encodeURIComponent(window.location.pathname) +
                '&redirected=true&t=' + Date.now();
            
            console.log('🔄 Redirecting to:', redirectUrl);
            window.location.replace(redirectUrl);
        }, 1000);
    }
    
    // JALANKAN SETELAH PAGE LOAD
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(ultimatePageCheck, 2000);
        });
    } else {
        setTimeout(ultimatePageCheck, 2000);
    }
    
    // DEBUG
    window.checkPageNow = ultimatePageCheck;
    
})();