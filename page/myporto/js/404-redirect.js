// js/404-redirect.js
class PageNotFoundRedirect {
    constructor() {
        this.validPages = this.getValidPages();
        this.init();
    }
    
    getValidPages() {
        // Sesuaikan dengan struktur website Anda
        return [
            '/',
            '/index.html',
            '/page/myporto/myporto.html',
            '/404.html',
            // Tambahkan routes lain yang valid
        ];
    }
    
    getCurrentPageInfo() {
        return {
            path: window.location.pathname,
            href: window.location.href,
            hostname: window.location.hostname,
            isLocalhost: window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1'
        };
    }
    
    shouldSkipRedirect(pageInfo) {
        // Skip untuk file assets
        if (pageInfo.path.match(/\.(css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot|json)$/i)) {
            return true;
        }
        
        // Skip jika sudah di halaman 404
        if (pageInfo.path.includes('404.html') || pageInfo.path.includes('404')) {
            return true;
        }
        
        // Skip untuk localhost development (optional)
        if (pageInfo.isLocalhost && pageInfo.path.includes('test')) {
            return true;
        }
        
        return false;
    }
    
    isPageValid(pageInfo) {
        // Cek exact match
        if (this.validPages.includes(pageInfo.path)) {
            return true;
        }
        
        // Cek tanpa trailing slash
        const pathWithoutSlash = pageInfo.path.replace(/\/$/, '');
        if (this.validPages.includes(pathWithoutSlash)) {
            return true;
        }
        
        // Cek dengan index.html
        if (pageInfo.path.endsWith('/')) {
            const withIndex = pageInfo.path + 'index.html';
            if (this.validPages.includes(withIndex)) {
                return true;
            }
        }
        
        return false;
    }
    
    redirectTo404(pageInfo) {
        console.warn(`🔴 Page not found: ${pageInfo.path}. Redirecting to 404...`);
        
        // Tambahkan parameter untuk tracking
        const redirectUrl = `/404.html?from=${encodeURIComponent(pageInfo.path)}&t=${Date.now()}`;
        
        // Gunakan replace agar tidak bisa back
        window.location.replace(redirectUrl);
    }
    
    init() {
        // Tunggu DOM fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.checkPage());
        } else {
            this.checkPage();
        }
        
        // Juga cek saat history berubah (untuk SPA)
        window.addEventListener('popstate', () => this.checkPage());
    }
    
    checkPage() {
        const pageInfo = this.getCurrentPageInfo();
        
        console.log('🔍 Checking page:', pageInfo.path);
        
        // Skip jika tidak perlu redirect
        if (this.shouldSkipRedirect(pageInfo)) {
            console.log('⏭️ Skipping redirect check');
            return;
        }
        
        // Cek validitas halaman
        if (this.isPageValid(pageInfo)) {
            console.log('✅ Page is valid');
        } else {
            console.log('❌ Page is invalid');
            this.redirectTo404(pageInfo);
        }
    }
    
    // Method untuk debugging
    debug() {
        console.log('=== 404 Redirect Debug Info ===');
        console.log('Current path:', window.location.pathname);
        console.log('Valid pages:', this.validPages);
        console.log('Is valid?', this.isPageValid(this.getCurrentPageInfo()));
    }
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    window.pageRedirect = new PageNotFoundRedirect();
    
    // Untuk debugging di console: ketik pageRedirect.debug()
    console.log('✅ 404 Redirect script loaded');
    console.log('Type "pageRedirect.debug()" for debug info');
});