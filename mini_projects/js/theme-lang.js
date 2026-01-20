/**
 * Theme and Language Toggle for Mini Projects
 * Galih Hermawan @ https://galih.eu
 */

(function () {
    'use strict';

    // Initialize theme and language on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Prevent transitions on initial load
        document.body.classList.add('preload');

        initializeTheme();
        initializeLanguage();
        setupEventListeners();

        // Remove preload class after a brief delay
        setTimeout(() => {
            document.body.classList.remove('preload');
        }, 100);
    });

    /**
     * Initialize theme from localStorage or default to light
     */
    function initializeTheme() {
        const savedTheme = localStorage.getItem('mini-projects-theme') || 'light';
        applyTheme(savedTheme);
    }

    /**
     * Initialize language from localStorage or default to English
     */
    function initializeLanguage() {
        const savedLang = localStorage.getItem('mini-projects-language') || 'en';
        applyLanguage(savedLang);
    }

    /**
     * Setup event listeners for control buttons
     */
    function setupEventListeners() {
        const themeToggle = document.getElementById('themeToggle');
        const langToggle = document.getElementById('langToggle');

        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        if (langToggle) {
            langToggle.addEventListener('click', toggleLanguage);
        }

        // Optional: Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt+T for theme toggle
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                toggleTheme();
            }
            // Alt+L for language toggle
            if (e.altKey && e.key === 'l') {
                e.preventDefault();
                toggleLanguage();
            }
        });
    }

    /**
     * Toggle between light and dark theme
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('mini-projects-theme', newTheme);
    }

    /**
     * Apply theme to the document
     * @param {string} theme - 'light' or 'dark'
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        updateThemeTooltip(theme);
    }

    /**
     * Update theme toggle button icon
     * @param {string} theme - Current theme
     */
    function updateThemeIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        if (!icon) return;

        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    /**
     * Update theme toggle button tooltip text
     * @param {string} theme - Current theme
     */
    function updateThemeTooltip(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        if (theme === 'dark') {
            themeToggle.setAttribute('data-tooltip-en', 'Switch to Light Mode');
            themeToggle.setAttribute('data-tooltip-id', 'Ganti ke Mode Terang');
        } else {
            themeToggle.setAttribute('data-tooltip-en', 'Switch to Dark Mode');
            themeToggle.setAttribute('data-tooltip-id', 'Ganti ke Mode Gelap');
        }
    }

    /**
     * Toggle between English and Indonesian
     */
    function toggleLanguage() {
        const currentLang = document.documentElement.getAttribute('lang') || 'en';
        const newLang = currentLang === 'en' ? 'id' : 'en';
        applyLanguage(newLang);
        localStorage.setItem('mini-projects-language', newLang);
    }

    /**
     * Apply language to the document
     * @param {string} lang - 'en' or 'id'
     */
    function applyLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        updateLanguageButton(lang);
        updateTranslatableContent(lang);
    }

    /**
     * Update language toggle button text
     * @param {string} lang - Current language
     */
    function updateLanguageButton(lang) {
        const langToggle = document.getElementById('langToggle');
        if (!langToggle) return;

        const langText = langToggle.querySelector('.lang-text');
        if (!langText) return;

        langText.textContent = lang === 'en' ? 'EN' : 'ID';
    }

    /**
     * Update all translatable content based on data-en and data-id attributes
     * @param {string} lang - Target language
     */
    function updateTranslatableContent(lang) {
        const elements = document.querySelectorAll('[data-en][data-id]');

        elements.forEach(element => {
            const translation = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-id');

            if (translation) {
                // Update text content or value based on element type
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.type === 'button' || element.type === 'submit') {
                        element.value = translation;
                    } else {
                        element.placeholder = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
    }
})();
