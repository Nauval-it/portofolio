const portfolioData = [
    {
        id: 1,
        type: 'artikel',
        titleKey: 'artikel_1_title',
        descKey: 'artikel_1_desc',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*sPA7Cg5IJViQM_pq1Kh4lw.png',
        categoryKey: 'cat_jaringan',
        url: 'https://medium.com/@nauvalx3/jaringan-itu-apa-e58ed9d6e779'
    },
    {
        id: 2,
        type: 'artikel',
        titleKey: 'artikel_2_title',
        descKey: 'artikel_2_desc',
        imageUrl: 'https://i.ibb.co.com/k28sk36p/Screenshot-2025-11-05-101232.png',
        categoryKey: 'cat_topologi',
        url: 'https://medium.com/@nauvalx3/topoligi-jaringan-22e4091318c9'
    },
    {
        id: 3,
        type: 'artikel',
        titleKey: 'artikel_3_title',
        descKey: 'artikel_3_desc',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*MCJhazp900fkivotutC9Pg.jpeg',
        category: 'cat_jaringan',
        url: 'https://medium.com/@nauvalx3/perangkat-jaringan-itu-apa-aja-sih-05167c0d21ef'
    },
    {
        id: 4,
        type: 'artikel',
        titleKey: 'artikel_4_title',
        descKey: 'artikel_4_desc',
        imageUrl: 'https://www.inlink.systems/wp-content/uploads/2024/01/Inlink_wired_vs_wireless_network.png',
        category: 'cat_jaringan',
        url: 'https://medium.com/@nauvalx3/apa-bedanya-wireless-dan-wired-44b27adb0782'
    },
    {
        id: 5,
        type: 'artikel',
        titleKey: 'artikel_5_title',
        descKey: 'artikel_5_desc',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*K_MP7pxN30TJLE5HuY_i1A.png',
        category: 'cat_jaringan',
        url: 'https://medium.com/@nauvalx3/tutorial-menggunakan-printer-sharing-68e3f4a7dffe'
    },
    // ... artikel 3-5
    {
        id: 6,
        type: 'video',
        titleKey: 'video_1_title',
        descKey: 'video_1_desc',
        videoUrl: 'https://youtu.be/JIYIlP3UnBs',
        imageUrl: 'https://i.ibb.co.com/RGR7KQhV/Purple-and-White-Simple-Gaming-Youtube-Thumbnail.png',
        categoryKey: 'cat_configuration'
    },
    {
        id: 7,
        type: 'video',
        titleKey: 'video_2_title',
        descKey: 'video_2_desc',
        videoUrl: 'https://youtu.be/N_nZsgwvkYg',
        imageUrl: 'https://i.ibb.co.com/s9PvHzGZ/Purple-and-White-Simple-Gaming-Youtube-Thumbnail.png',
        categoryKey: 'cat_routing'
    }
];

const container = document.getElementById('portfolioContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

let currentPortfolioData = [];

// ===== Render Portfolio dengan Bahasa & Filter Terakhir =====
window.renderPortfolioLang = function (lang) {
    if (!container) return;

    currentPortfolioData = portfolioData.map(item => ({
        ...item,
        title: lang[item.titleKey],
        description: lang[item.descKey],
        category: lang[item.categoryKey]
    }));

    // Ambil filter terakhir dari localStorage, default 'all'
    const savedFilter = localStorage.getItem('activeFilter') || 'all';
    
    filterByButton(savedFilter, false); // render & update tombol
};

// ===== Buat Card =====
function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('portfolio-item', item.type);
    card.setAttribute('data-category', item.type);
    card.setAttribute('data-title', item.title.toLowerCase());

    card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}" class="item-image">
        <div class="item-content">
            <div>
                <span class="item-category">${item.category}</span>
                <h3 class="item-title">${item.title}</h3>
                <p>${item.description}</p>
            </div>
            ${
                item.type === 'artikel'
                ? `<div class="artikel-footer">
                        <a href="${item.url}" class="btn-view">View</a>
                   </div>`
                : `<div class="video-footer">
                        <a href="${item.videoUrl}" target="_blank" class="btn-visit-video">Visit Video</a>
                   </div>`
            }
        </div>
    `;

    return card;
}

// ===== Render Portfolio =====
function renderPortfolio(data) {
    container.innerHTML = '';
    data.forEach(item => container.appendChild(createCard(item)));
    addPortfolioItemAnimations();
}

// ===== Filter Portfolio =====
function filterByButton(filterType, save = true) {
    const searchTerm = searchInput.value.toLowerCase();

    filterButtons.forEach(btn => {
        btn.classList.toggle(
            'active',
            btn.dataset.filter === filterType
        );
    });

    const filteredData = currentPortfolioData.filter(item => {
        const typeMatch = filterType === 'all' || item.type === filterType;
        const searchMatch = item.title.toLowerCase().includes(searchTerm);
        return typeMatch && searchMatch;
    });

    renderPortfolio(filteredData);

    if (save) {
        localStorage.setItem('activeFilter', filterType);
    }

    setTimeout(() => {
        animateNewContent();
    }, 100);
}

// ===== Event Listeners =====
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterByButton(btn.dataset.filter);
    });
});

function filterContent() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    filterByButton(activeFilter);
}

// ===== Animasi =====
function animateElements() {
    // ... sama seperti sebelumnya
}

function animateNewContent() {
    const newItems = document.querySelectorAll('.portfolio-item:not(.animated)');
    newItems.forEach((item, index) => {
        item.classList.add('animated');
        item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
    });
}

function addPortfolioItemAnimations() {
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
}
