'use strict';

(function () {
    const MOBILE_BREAKPOINT = 800;

    function setActiveLink(container) {
        const links = container.querySelectorAll('a[href]');
        if (!links.length) {
            return;
        }

        const rawPath = window.location.pathname;
        const normalizedPath = (() => {
            if (!rawPath || rawPath === '/') {
                return 'index.html';
            }
            const segments = rawPath.split('/');
            const lastSegment = segments.pop() || segments.pop();
            return lastSegment || 'index.html';
        })();

        links.forEach(link => link.classList.remove('active'));

        if (normalizedPath === 'index.html') {
            const homeLink = container.querySelector('#home-link');
            if (homeLink) {
                homeLink.classList.add('active');
            }
            return;
        }

        const match = Array.from(links).find(link => {
            const href = link.getAttribute('href');
            if (!href) {
                return false;
            }
            if (href === normalizedPath) {
                return true;
            }
            if (href === `./${normalizedPath}`) {
                return true;
            }
            return false;
        });

        if (match) {
            match.classList.add('active');
        }
    }

    function initNavbar(container) {
        const menuToggle = container.querySelector('#menu-toggle');
        const navbarList = container.querySelector('#navbar-list');
        if (!menuToggle || !navbarList) {
            return;
        }

        const closeMenu = () => {
            navbarList.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            navbarList.style.maxHeight = '0px';
        };

        const openMenu = () => {
            navbarList.classList.add('open');
            menuToggle.classList.add('open');
            menuToggle.setAttribute('aria-expanded', 'true');
            navbarList.style.maxHeight = `${navbarList.scrollHeight}px`;
            const firstLink = navbarList.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        };

        const toggleMenu = () => {
            if (navbarList.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMenu();
            }
        });

        container.querySelectorAll('#navbar-list a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= MOBILE_BREAKPOINT) {
                    closeMenu();
                }
            });
        });

        const syncMenuState = () => {
            if (window.innerWidth > MOBILE_BREAKPOINT) {
                navbarList.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.removeAttribute('aria-expanded');
                navbarList.style.removeProperty('max-height');
            } else {
                closeMenu();
            }
        };

        syncMenuState();
        window.addEventListener('resize', syncMenuState);
    }

    async function loadNavbar() {
        const container = document.getElementById('navbar');
        if (!container) {
            return;
        }

        try {
            const response = await fetch('navbar.html');
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.status}`);
            }
            const markup = await response.text();
            container.innerHTML = markup;
            initNavbar(container);
            setActiveLink(container);
        } catch (error) {
            console.error('Erro ao carregar a navbar:', error);
        }
    }

    const start = () => {
        loadNavbar();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
