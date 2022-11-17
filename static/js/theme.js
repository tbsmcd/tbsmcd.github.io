const cbDark = document.getElementById("cb-dark-theme");
const setDark = () => {
    document.body.classList.add("dark-theme");
    cbDark.checked = true;
};
const setLight = () => {
    document.body.classList.remove("dark-theme");
    cbDark.checked = false;
}

window.addEventListener("load", (event) => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme == "dark") {
        setDark();
    } else if (selectedTheme == "light") {
        setLight();
    } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setDark();
        } else {
            setLight();
        }
    }
});

cbDark.addEventListener("change", () => {
    if (this.checked == true) {
        setDark();
        localStorage.setItem("selectedTheme", "dark");
    } else {
        localStorage.setItem("selectedTheme", "light");
    }
});