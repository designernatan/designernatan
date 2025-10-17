function applyLightTheme() {
    const root = document.documentElement;
    root.style.setProperty('--text-color', '#525A7A');
    root.style.setProperty('--accent-color', '#E4572E');
    root.style.setProperty('--accent-color-light', '#F06A4E');
    root.style.setProperty('--accent-color-dark', '#C13C1E');
    root.style.setProperty('--background-color', '#FDFAF2');
    root.style.setProperty('--white-color', '#FFFFFF');
    root.style.setProperty('--heading-color', '#5FA79B');
    root.style.setProperty('--border-color', 'rgba(228, 87, 46, .2)');
    document.body.classList.remove('dark-theme');
}

applyLightTheme();
