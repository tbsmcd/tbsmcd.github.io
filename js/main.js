document.addEventListener("DOMContentLoaded", (event) => {
    followHeight();
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme == "dark") {
        setDark();
    } else if (selectedTheme == "light") {
        setLight();
    } else {
        const pcs = window.matchMedia("(prefers-color-scheme: dark)"); 
        if (pcs.matches) {
            setDark();
        } else {
            setLight();
        }
    }
});
window.addEventListener('resize', followHeight);

// ブラウザ高さ対応
const followHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// ダークテーマ
const cbDark = document.getElementById("cb-dark-theme");
const setDark = () => {
    document.body.classList.add("dark-theme");
    cbDark.checked = true;
};
const setLight = () => {
    document.body.classList.remove("dark-theme");
    cbDark.checked = false;
}
cbDark.addEventListener("change", (e) => {
    if (e.target.checked) {
        setDark();
        localStorage.setItem("selectedTheme", "dark");
    } else {
        setLight();
        localStorage.setItem("selectedTheme", "light");
    }
});