/**
 * Internationalization (i18n) System
 * Language switcher for English and Spanish
 */

(function() {
    'use strict';

    // Default language
    const DEFAULT_LANG = 'en';

    // Translations cache
    let translations = {};

    // Current language
    let currentLang = localStorage.getItem('language') || DEFAULT_LANG;

    /**
     * Load translation file
     */
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json`);
            }
            translations = await response.json();
            return translations;
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to default language if current language fails
            if (lang !== DEFAULT_LANG) {
                return loadTranslations(DEFAULT_LANG);
            }
            return {};
        }
    }

    /**
     * Get nested translation value
     */
    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    }

    /**
     * Translate all elements with data-i18n attribute
     */
    function translatePage() {
        // Translate elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedTranslation(translations, key);

            if (translation) {
                // Check if element should translate placeholder
                if (element.hasAttribute('data-i18n-placeholder')) {
                    element.placeholder = translation;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Translate elements with data-i18n-html (for HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = getNestedTranslation(translations, key);

            if (translation) {
                element.innerHTML = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = currentLang;
    }

    /**
     * Change language
     */
    async function changeLanguage(lang) {
        if (lang !== currentLang) {
            currentLang = lang;
            localStorage.setItem('language', lang);

            // Update button states
            updateLanguageButtons();

            // Load translations and update page
            await loadTranslations(lang);
            translatePage();

            // Dispatch custom event for other scripts
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));
        }
    }

    /**
     * Update language button states
     */
    function updateLanguageButtons() {
        document.querySelectorAll('[data-lang]').forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === currentLang) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'true');
            } else {
                button.classList.remove('active');
                button.removeAttribute('aria-current');
            }
        });

        // Update language toggle button text if exists
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.textContent = currentLang.toUpperCase();
        }
    }

    /**
     * Initialize i18n system
     */
    async function init() {
        // Load initial translations
        await loadTranslations(currentLang);
        translatePage();
        updateLanguageButtons();

        // Add click handlers to language buttons
        document.querySelectorAll('[data-lang]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Alt + L to toggle language
            if (e.altKey && e.key === 'l') {
                e.preventDefault();
                const newLang = currentLang === 'en' ? 'es' : 'en';
                changeLanguage(newLang);
            }
        });
    }

    /**
     * Public API
     */
    window.i18n = {
        init: init,
        changeLanguage: changeLanguage,
        getCurrentLanguage: () => currentLang,
        t: (key) => getNestedTranslation(translations, key)
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
