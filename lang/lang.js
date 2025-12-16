let LANG = {};
let currentLang = localStorage.getItem("lang") || "en";

async function loadLangData() {
    try {
        const res = await fetch("/lang/lang-data.json");
        LANG = await res.json();

        applyLanguage(currentLang);

        const switcher = document.getElementById("langSwitcher");
        if (switcher) switcher.value = currentLang;

    } catch (e) {
        console.error("Failed load lang-data.json", e);
    }
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.dataset.lang;
        if (LANG[lang]?.[key]) {
            el.textContent = LANG[lang][key];
        }
    });

    document.querySelectorAll("[data-lang-placeholder]").forEach(el => {
        const key = el.dataset.langPlaceholder;
        if (LANG[lang]?.[key]) {
            el.placeholder = LANG[lang][key];
        }
    });

    if (LANG[lang]?.page_title) {
        document.title = LANG[lang].page_title;
    }

    updateTyped(lang);

    if (window.renderPortfolioLang) {
        window.renderPortfolioLang(LANG[lang]);
    }
}

document.addEventListener("change", e => {
    if (e.target.id === "langSwitcher") {
        const opt = e.target.options[e.target.selectedIndex];
        const flag = opt.dataset.flag;

        document.getElementById("langFlag").src = flag;
        document.getElementById("langLabel").textContent =
            "Language: " + opt.textContent;

        applyLanguage(opt.value);
    }
});

async function loadLangData() {
    try {
        const response = await fetch("/lang/lang-data.json");
        LANG = await response.json();

        // Ambil bahasa dari localStorage atau default
        let lang = localStorage.getItem("lang") || "en";

        // Terapkan bahasa ke konten
        applyLanguage(lang);

        // Terapkan ke select & flag/label
        const langSwitcher = document.getElementById("langSwitcher");
        if (langSwitcher) {
            langSwitcher.value = lang;

            const selectedOption = langSwitcher.options[langSwitcher.selectedIndex];
            const flag = selectedOption.getAttribute("data-flag");
            const label = selectedOption.textContent;

            document.getElementById("langFlag").src = flag;
            document.getElementById("langLabel").textContent = "Language: " + label;
        }

        // Render portfolio sesuai bahasa
        if (window.renderPortfolioLang) window.renderPortfolioLang(LANG[lang]);

    } catch (error) {
        console.error("Gagal load lang-data.json:", error);
    }
}

loadLangData();

let typedInstance = null;

function updateTyped(lang) {
    const el = document.getElementById("element");
    if (!el) return;

    if (!LANG[lang] || !LANG[lang].typed_texts) return;

    if (typedInstance) {
        typedInstance.destroy();
        el.textContent = "";
    }

    typedInstance = new Typed("#element", {
        strings: LANG[lang].typed_texts,
        loop: true,
        typeSpeed: 120,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        cursorChar: ""
    });
}
