// Data Dummy untuk Artikel dan Video
const portfolioData = [
    // 5 Artikel
    {
        id: 1,
        type: 'artikel',
        title: 'Apa Itu Jaringan',
        description: 'Saat ini saya sedang belajar di Sekolah tentang dasar-dasar jaringan, yang saya pahami jaringan itu dapat tercipta disaat sebuah media baik berupa kabel maupun nirkabel yang dimana antar perengakat yang berkomunikasinya wajib memiliki sebuah identitas, sehingga disaat pengiriman data kita dapat mengetahui tujuan dan letaknya. ',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*sPA7Cg5IJViQM_pq1Kh4lw.png',
        category: 'Jaringan',
        url: 'https://medium.com/@nauvalx3/jaringan-itu-apa-e58ed9d6e779'
    },
    {
        id: 2,
        type: 'artikel',
        title: 'Topologi Jaringan',
        description: 'Bicara tentang jaringan tentunya kita harus membuat sebuah peta atau rancangan perangkat-perangkat jaringan yang saling terhubung.',
        imageUrl: 'https://i.ibb.co.com/k28sk36p/Screenshot-2025-11-05-101232.png',
        category: 'Topologi',
        url: 'https://medium.com/@nauvalx3/topoligi-jaringan-22e4091318c9'
    },
    {
        id: 3,
        type: 'artikel',
        title: 'Perangkat Jaringan',
        description: 'Bicara soal Jaringan pasti ada perangkatnya, ada apa aja sih dan fungsinya buat apa.',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:600/format:webp/1*I4xtEsv0nmwp5NPL6-LjAw.jpeg',
        category: 'Jaringan',
        url: 'https://medium.com/@nauvalx3/perangkat-jaringan-itu-apa-aja-sih-05167c0d21ef'
    },
    {
        id: 4,
        type: 'artikel',
        title: 'Wireless Vs Wired',
        description: 'Seperti yang kita ketahui jaringan itu harus ada media penghubungnya, medianya ada banyak namun dapat dikelompokan menjadi 2 bagian. Yakni Wireless dan Wired.',
        imageUrl: 'https://www.inlink.systems/wp-content/uploads/2024/01/Inlink_wired_vs_wireless_network.png',
        category: 'Jaringan',
        url: 'https://medium.com/@nauvalx3/apa-bedanya-wireless-dan-wired-44b27adb0782'
    },
    {
        id: 5,
        type: 'artikel',
        title: 'Printer Sharing',
        description: 'Bagai mana cara agar 1 printer dapat digunakan bersama-sama oleh beberapa komputer dalam suatu lab.',
        imageUrl: 'https://support.brother.com/g/b/img/faqend/faqp00001616_001/us/en/29650/nonnet02.gif',
        category: 'Jaringan', 
        url: '#'
    },
    // 2 Video
    {
        id: 6,
        type: 'video',
        title: 'Membangun Jarinagn WLan dan Lan',
        description: 'Tutorial lengkap cara membangun jaringan LAN dan WLAN dari nol hingga siap digunakan.',
        videoUrl: 'https://youtu.be/JIYIlP3UnBs?si=psBmEXsINA3Azj-a',
        imageUrl: 'https://i.ibb.co.com/RGR7KQhV/Purple-and-White-Simple-Gaming-Youtube-Thumbnail.png',
        category: 'Configuration'
    },
    {
        id: 7,
        type: 'video',
        title: 'Cara Routing static di cisco packet tracer',
        description: 'Tutorial lengkap cara melakukan routing static di cisco packet tracer untuk pemula.',
        videoUrl: 'https://youtu.be/N_nZsgwvkYg?si=ssdqIHj5_X5e0XXt',
        imageUrl: 'https://i.ibb.co.com/s9PvHzGZ/Purple-and-White-Simple-Gaming-Youtube-Thumbnail.png',
        category: 'Routing'
    }
];

const container = document.getElementById('portfolioContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('portfolio-item', item.type);
    card.setAttribute('data-category', item.type);
    card.setAttribute('data-title', item.title.toLowerCase());

    let contentHTML = `
        <img src="${item.imageUrl}" alt="${item.title}" class="item-image">
        <div class="item-content">
            <div>
                <span class="item-category">${item.category}</span>
                <h3 class="item-title">${item.title}</h3>
                <p>${item.description}</p>
            </div>
    `;

    // Konten Khusus untuk Artikel
    if (item.type === 'artikel') {
        contentHTML += `
           <div class="artikel-footer">
                <div class="item-actions">
                    <a href="${item.url}" class="btn-view">View</a> 
                </div>
            </div>
        `;
    } 
    // Konten Khusus untuk Video
    else if (item.type === 'video') {
        contentHTML += `
            <div class="video-footer">
                <div class="item-actions">
                    <a href="${item.videoUrl}" target="_blank" class="btn-visit-video">Visit Video</a>
                </div>
            </div>
        `;
    }

    contentHTML += '</div>';
    card.innerHTML = contentHTML;
    return card;
}


function renderPortfolio(data) {
    container.innerHTML = ''; 
    data.forEach(item => {
        container.appendChild(createCard(item));
    });
}


function filterByButton(filterType) {
    const searchTerm = searchInput.value.toLowerCase();
    

    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filterType) {
            btn.classList.add('active');
        }
    });

    const filteredData = portfolioData.filter(item => {
        const typeMatch = filterType === 'all' || item.type === filterType;
        const searchMatch = item.title.toLowerCase().includes(searchTerm);
        return typeMatch && searchMatch;
    });

    renderPortfolio(filteredData);
}


function filterContent() {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    filterByButton(activeFilter);
}


filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filterType = this.getAttribute('data-filter');
        filterByButton(filterType);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio(portfolioData);
});

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
  hamburger.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', function() {
    

    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.id = 'loadingScreen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loader"></div>
            <h2 class="loading-text">Memuat Portfolio...</h2>
        </div>
    `;
    document.body.prepend(loadingScreen);

    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            animateElements();
        }, 1000);
    });
    elemen
    function animateElements() {
        const header = document.querySelector('.portfolio-header');
        if (header) header.style.animation = 'fadeInUp 0.8s ease forwards';
        
        const controls = document.querySelector('.controls-container');
        if (controls) controls.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach((btn, index) => {
            btn.style.animation = `fadeIn 0.5s ease ${0.3 + (index * 0.1)}s forwards`;
        });
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.style.animation = 'fadeInUp 0.8s ease 0.3s forwards';
        
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.style.animation = `fadeInUp 0.8s ease ${0.3 + (index * 0.1)}s forwards`;
        });
        
        const footer = document.querySelector('.footer');
        if (footer) footer.style.animation = 'fadeIn 1s ease 0.5s forwards';
    }
    
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
  
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
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
    
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(88, 166, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
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
    

    function animateNewContent() {
        const newItems = document.querySelectorAll('.portfolio-item:not(.animated)');
        newItems.forEach((item, index) => {
            item.classList.add('animated');
            item.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
        });
    }
});

// Hamburger Menu Script
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    // Buat overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Fungsi toggle menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    
    // Event listener untuk hamburger
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
            const opened = menu.classList.toggle("active");
            hamburger.classList.toggle("active");
            // accessibility: announce state
            hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');

            // focus and highlight first menu item when opened
            const firstLink = menu.querySelector('a');
            if (opened && firstLink) {
                firstLink.classList.add('highlight');
                try { firstLink.focus({ preventScroll: true }); } catch(e) { firstLink.focus(); }
            } else if (firstLink) {
                firstLink.classList.remove('highlight');
            }
    });
    
    // Tutup menu saat klik overlay
    overlay.addEventListener('click', function() {
        toggleMenu();
    });
    
    // Tutup menu saat klik link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });
    
    // Tutup menu saat resize ke desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});
