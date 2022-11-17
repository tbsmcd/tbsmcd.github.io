window.addEventListener("load", (event) => {
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
const cbDark = document.getElementById("cb-dark-theme");
const setDark = () => {
    console.log("DARK");
    document.body.classList.add("dark-theme");
    cbDark.checked = true;
};
const setLight = () => {
    console.log("LIGHT");
    document.body.classList.remove("dark-theme");
    cbDark.checked = false;
}
cbDark.addEventListener("change", () => {
    if (this.checked == true) {
        setDark();
        localStorage.setItem("selectedTheme", "dark");
    } else {
        localStorage.setItem("selectedTheme", "light");
    }
});