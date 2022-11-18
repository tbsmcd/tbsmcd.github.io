document.addEventListener("DOMContentLoaded", (event) => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    console.log("localStorage");
    console.log(selectedTheme);
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
cbDark.addEventListener("change", (e) => {
    console.log("cliekd");
    if (e.target.checked) {
        console.log("cheked");
        setDark();
        localStorage.setItem("selectedTheme", "dark");
    } else {
        console.log("uncheked");
        setLight();
        localStorage.setItem("selectedTheme", "light");
    }
});