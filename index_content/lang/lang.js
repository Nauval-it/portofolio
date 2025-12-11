let LANG = {}; 
let currentLang = localStorage.getItem("lang") || "id";

async function loadLangData() {
    try {
        const response = await fetch("/index_content/lang/lang-data.json");
        LANG = await response.json();

        applyLanguage(currentLang);

        document.getElementById("langSwitcher").value = currentLang;

    } catch (error) {
        console.error("Gagal load lang-data.json:", error);
    }
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    const elements = document.querySelectorAll("[data-lang]");
    elements.forEach(el => {
        const key = el.getAttribute("data-lang");
        if (LANG[lang] && LANG[lang][key]) {
            el.textContent = LANG[lang][key];
        }
    });

    document.title = LANG[lang].title || document.title;

    updateTyped(lang)
}
let typedInstance;

function updateTyped(lang) {
    const target = document.getElementById("element");
    if (!target) return;

    if (typedInstance) typedInstance.destroy();

    typedInstance = new Typed("#element", {
        strings: LANG[lang].typed_texts,
        loop: true,
            typeSpeed: 120,
            backSpeed: 50, 
            backDelay: 1500,
            startDelay: 500,
            cursorChar: '',
            smartBackspace: true
    });
}

loadLangData(); 
document.getElementById("langSwitcher").addEventListener("change", function () {
    const selected = this.options[this.selectedIndex];

    const flag = selected.getAttribute("data-flag");
    const label = selected.textContent; 

    document.getElementById("langFlag").src = flag;
    document.getElementById("langLabel").textContent = "Language: " + label;

    applyLanguage(lang);
});

