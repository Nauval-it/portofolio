const globalMaintenance = false;
const maintenancePages = ['/page/certificate/certificate']; 
const whitelistPages = [];

const maintenanceRedirect = '/page/maintenance/maintenance.html';

(function () {
    // normalisasi path: hapus trailing slash + hapus .html + lowercase
    const page = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '').toLowerCase();

    let needMaintenance = false;

    // global maintenance
    if (globalMaintenance && !whitelistPages.includes(page)) {
        needMaintenance = true;
    }

    // per halaman maintenance
    if (!globalMaintenance && maintenancePages.map(p => p.toLowerCase()).includes(page)) {
        needMaintenance = true;
    }

    if (!needMaintenance) return;

    // tampil loading
    document.body.innerHTML = `
        <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            height:100vh;
            background:#0d0d0d;
            color:white;
            font-family:Poppins,sans-serif;
            font-size:2rem;
            flex-direction:column;
        ">
            <div>Checking System<span id="dots">.</span></div>
            <p style="opacity:.5; margin-top:8px; font-size:14px;">Please wait…</p>
        </div>
    `;

    let d = 1;
    setInterval(() => {
        d = (d % 3) + 1;
        document.getElementById("dots").textContent = ".".repeat(d);
    }, 400);

    // redirect ke halaman maintenance
    setTimeout(() => {
        if (window.location.pathname !== maintenanceRedirect) {
            window.location.href = maintenanceRedirect;
        }
    }, 2500);

})();
