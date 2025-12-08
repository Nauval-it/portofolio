// true = semua halaman kena maintenance
// false = hanya pages tertentu yang kena
const globalMaintenance = false;
const maintenancePages = ['/page/certificate/certificate.html'];
const whitelistPages = [];

// Atur maintenance
(function () {
    const page = window.location.pathname.split("/").pop();

    let needMaintenance = false;

    // --- 1. GLOBAL MAINTENANCE MODE ---
    if (globalMaintenance) {
        if (!whitelistPages.includes(page)) {
            needMaintenance = true;
        }
    }

    // --- 2. MAINTENANCE MODE PER HALAMAN ---
    if (!globalMaintenance && maintenancePages.includes(page)) {
        needMaintenance = true;
    }

    if (!needMaintenance) return;

    document.body.innerHTML = `
        <div id="checking-container" style="
            display:flex;
            align-items:center;
            justify-content:center;
            height:100vh;
            background:#0d0d0d;
            color:white;
            font-family:Poppins, sans-serif;
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

    setTimeout(() => {
        window.location.href = "/page/maintenance/maintenance.html";
    }, 2500);

})();
