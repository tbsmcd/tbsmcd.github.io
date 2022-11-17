window.addEventListener('load', () => {
    const selectedTheme = this.localStorage.getItem('selectedTheme');
    if (selectedTheme == 'dark') {
        setDark();
    } else if (selectedTheme == 'light') {
        setLight();
    } else {
        const mql = this.matchMedia('(prefers-color-scheme: dark)');
        if (mql.matches) {
            setDark();
        } else {
            setLight();
        }
    }
});

const setDark = () => {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
};
const setLight = () => {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
}
