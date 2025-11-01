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

    // Original content cache (to restore English)
    const originalContent = new Map();

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
     * Save original content from HTML
     */
    function saveOriginalContent() {
        // Save original content for data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');

            if (!originalContent.has(key)) {
                if (element.hasAttribute('data-i18n-placeholder')) {
                    originalContent.set(key, { type: 'placeholder', value: element.placeholder });
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    originalContent.set(key, { type: 'value', value: element.value });
                } else {
                    originalContent.set(key, { type: 'text', value: element.textContent });
                }
            }
        });

        // Save original content for data-i18n-html elements
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');

            if (!originalContent.has(key)) {
                originalContent.set(key, { type: 'html', value: element.innerHTML });
            }
        });
    }

    /**
     * Translate all elements with data-i18n attribute
     */
    function translatePage() {
        // If language is English, restore original content
        if (currentLang === DEFAULT_LANG) {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const original = originalContent.get(key);

                if (original) {
                    if (original.type === 'placeholder') {
                        element.placeholder = original.value;
                    } else if (original.type === 'value') {
                        element.value = original.value;
                    } else if (original.type === 'text') {
                        element.textContent = original.value;
                    }
                }
            });

            document.querySelectorAll('[data-i18n-html]').forEach(element => {
                const key = element.getAttribute('data-i18n-html');
                const original = originalContent.get(key);

                if (original && original.type === 'html') {
                    element.innerHTML = original.value;
                }
            });
        } else {
            // Translate to non-English language
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = getNestedTranslation(translations, key);

                if (translation) {
                    if (element.hasAttribute('data-i18n-placeholder')) {
                        element.placeholder = translation;
                    } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.value = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            });

            document.querySelectorAll('[data-i18n-html]').forEach(element => {
                const key = element.getAttribute('data-i18n-html');
                const translation = getNestedTranslation(translations, key);

                if (translation) {
                    element.innerHTML = translation;
                }
            });
        }

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

            // Load translations and update page (only if not English)
            if (lang !== DEFAULT_LANG) {
                await loadTranslations(lang);
            }
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
        // Save original content from HTML (English)
        saveOriginalContent();

        // Only load and apply translations if not in default language
        if (currentLang !== DEFAULT_LANG) {
            await loadTranslations(currentLang);
            translatePage();
        }

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
