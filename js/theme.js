const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(e) {
    const root = document.documentElement;
    if (e.matches) {
        // Dark mode
        root.style.setProperty('--text-color', 'var(--dark-text-color)');
        root.style.setProperty('--accent-color', 'var(--dark-accent-color)');
        root.style.setProperty('--accent-color-light', 'var(--dark-accent-color-light)');
        root.style.setProperty('--accent-color-dark', 'var(--dark-accent-color-dark)');
        root.style.setProperty('--background-color', 'var(--dark-background-color)');
        root.style.setProperty('--white-color', 'var(--dark-white-color)');
        root.style.setProperty('--heading-color', 'var(--dark-heading-color)');
        root.style.setProperty('--border-color', 'var(--dark-border-color)');
        document.body.classList.add('dark-theme');
    } else {
        // Light mode (reset to original values if necessary, or just let CSS handle it)
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
}

applyTheme(colorSchemeQuery);
colorSchemeQuery.addListener(applyTheme);
