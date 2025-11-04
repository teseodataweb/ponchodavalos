/**
 * Currency Switcher - MXN/USD
 * Handles currency conversion and display for property prices
 * Uses real-time exchange rates from API with fallback
 */

(function() {
    'use strict';

    // API Configuration
    const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/USD';
    const FALLBACK_RATE = 18.5; // Fallback if API fails
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Default currency
    const DEFAULT_CURRENCY = 'MXN';

    // Current exchange rate (will be fetched from API)
    let EXCHANGE_RATE = FALLBACK_RATE;

    // Initialize currency system
    const CurrencySwitcher = {
        currentCurrency: DEFAULT_CURRENCY,
        rateLastUpdated: null,

        init: async function() {
            console.log('[Currency Switcher] Initializing...');

            // Fetch exchange rate from API
            await this.fetchExchangeRate();

            // Load saved currency preference
            this.currentCurrency = localStorage.getItem('preferredCurrency') || DEFAULT_CURRENCY;

            // Setup event listeners
            this.setupEventListeners();

            // Apply saved currency
            this.applyCurrency(this.currentCurrency, false);

            // Update active button state
            this.updateButtonStates();

            console.log('[Currency Switcher] Initialized with currency:', this.currentCurrency);
            console.log('[Currency Switcher] Exchange rate (USD to MXN):', EXCHANGE_RATE);
        },

        fetchExchangeRate: async function() {
            try {
                // Check if we have a cached rate
                const cachedData = this.getCachedRate();
                if (cachedData) {
                    EXCHANGE_RATE = cachedData.rate;
                    this.rateLastUpdated = new Date(cachedData.timestamp);
                    console.log('[Currency Switcher] Using cached exchange rate:', EXCHANGE_RATE);
                    return;
                }

                // Fetch from API
                console.log('[Currency Switcher] Fetching exchange rate from API...');
                const response = await fetch(EXCHANGE_RATE_API);

                if (!response.ok) {
                    throw new Error(`API responded with status: ${response.status}`);
                }

                const data = await response.json();

                // Extract MXN rate
                if (data.rates && data.rates.MXN) {
                    EXCHANGE_RATE = data.rates.MXN;
                    this.rateLastUpdated = new Date();

                    // Cache the rate
                    this.cacheRate(EXCHANGE_RATE);

                    console.log('[Currency Switcher] ✓ Exchange rate fetched successfully:', EXCHANGE_RATE);
                } else {
                    throw new Error('MXN rate not found in API response');
                }

            } catch (error) {
                console.warn('[Currency Switcher] Failed to fetch exchange rate:', error.message);
                console.log('[Currency Switcher] Using fallback rate:', FALLBACK_RATE);
                EXCHANGE_RATE = FALLBACK_RATE;
                this.rateLastUpdated = new Date();
            }
        },

        getCachedRate: function() {
            try {
                const cached = localStorage.getItem('exchangeRateCache');
                if (!cached) return null;

                const data = JSON.parse(cached);
                const now = Date.now();

                // Check if cache is still valid (less than 24 hours old)
                if (now - data.timestamp < CACHE_DURATION) {
                    return data;
                }

                // Cache expired
                localStorage.removeItem('exchangeRateCache');
                return null;

            } catch (error) {
                console.error('[Currency Switcher] Error reading cache:', error);
                return null;
            }
        },

        cacheRate: function(rate) {
            try {
                const cacheData = {
                    rate: rate,
                    timestamp: Date.now()
                };
                localStorage.setItem('exchangeRateCache', JSON.stringify(cacheData));
                console.log('[Currency Switcher] Exchange rate cached for 24 hours');
            } catch (error) {
                console.error('[Currency Switcher] Error caching rate:', error);
            }
        },

        setupEventListeners: function() {
            const currencyButtons = document.querySelectorAll('.currency-btn');

            currencyButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const currency = e.currentTarget.getAttribute('data-currency');
                    this.changeCurrency(currency);
                });
            });

            // Keyboard shortcut: Alt + C to toggle currency
            document.addEventListener('keydown', (e) => {
                if (e.altKey && e.key === 'c') {
                    e.preventDefault();
                    const newCurrency = this.currentCurrency === 'MXN' ? 'USD' : 'MXN';
                    this.changeCurrency(newCurrency);
                }
            });
        },

        changeCurrency: function(currency) {
            if (this.currentCurrency === currency) return;

            console.log('[Currency Switcher] Changing currency from', this.currentCurrency, 'to', currency);

            this.currentCurrency = currency;
            localStorage.setItem('preferredCurrency', currency);

            this.applyCurrency(currency, true);
            this.updateButtonStates();

            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('currencyChanged', {
                detail: { currency: currency }
            }));
        },

        applyCurrency: function(currency, animate = false) {
            const priceElements = document.querySelectorAll('[data-price-mxn]');

            priceElements.forEach(element => {
                if (animate) {
                    element.classList.add('price-changing');
                }

                const priceMXN = parseFloat(element.getAttribute('data-price-mxn'));
                const priceUSD = parseFloat(element.getAttribute('data-price-usd'));

                let displayPrice, symbol, currencyCode;

                if (currency === 'USD') {
                    // If USD price is provided, use it; otherwise calculate
                    displayPrice = priceUSD || (priceMXN / EXCHANGE_RATE);
                    symbol = '$';
                    currencyCode = 'USD';
                } else {
                    displayPrice = priceMXN;
                    symbol = '$';
                    currencyCode = 'MXN';
                }

                // Format the price
                const formattedPrice = this.formatPrice(displayPrice, currency);

                // Update the element
                element.textContent = `${symbol}${formattedPrice} ${currencyCode}`;

                if (animate) {
                    setTimeout(() => {
                        element.classList.remove('price-changing');
                    }, 200);
                }
            });

            // Update disclaimer exchange rate display
            this.updateDisclaimerRate();
        },

        formatPrice: function(price, currency) {
            // Round to appropriate decimal places
            let roundedPrice = currency === 'USD'
                ? Math.round(price).toLocaleString('en-US')
                : Math.round(price).toLocaleString('en-US');

            return roundedPrice;
        },

        updateButtonStates: function() {
            const buttons = document.querySelectorAll('.currency-btn');
            buttons.forEach(button => {
                const currency = button.getAttribute('data-currency');
                if (currency === this.currentCurrency) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        },

        updateDisclaimerRate: function() {
            const rateElement = document.querySelector('.exchange-rate');
            if (rateElement) {
                const formattedRate = EXCHANGE_RATE.toFixed(2);
                let rateText = `1 USD = ${formattedRate} MXN`;

                // Add last updated time if available
                if (this.rateLastUpdated) {
                    const timeAgo = this.getTimeAgo(this.rateLastUpdated);
                    rateText += ` (${timeAgo})`;
                }

                rateElement.textContent = rateText;
            }
        },

        getTimeAgo: function(date) {
            const now = new Date();
            const diffMs = now - date;
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMinutes = Math.floor(diffMs / (1000 * 60));

            // Get current language from i18n system if available
            const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'en';
            const isSpanish = currentLang === 'es';

            if (diffMinutes < 60) {
                return isSpanish
                    ? `actualizado hace ${diffMinutes}m`
                    : `updated ${diffMinutes}m ago`;
            } else if (diffHours < 24) {
                return isSpanish
                    ? `actualizado hace ${diffHours}h`
                    : `updated ${diffHours}h ago`;
            } else {
                const diffDays = Math.floor(diffHours / 24);
                return isSpanish
                    ? `actualizado hace ${diffDays}d`
                    : `updated ${diffDays}d ago`;
            }
        },

        getCurrentCurrency: function() {
            return this.currentCurrency;
        },

        getExchangeRate: function() {
            return EXCHANGE_RATE;
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', async () => {
            await CurrencySwitcher.init();
        });
    } else {
        CurrencySwitcher.init();
    }

    // Expose API globally
    window.CurrencySwitcher = CurrencySwitcher;

    // Listen for language changes to update disclaimer text and time ago
    window.addEventListener('languageChanged', function(e) {
        console.log('[Currency Switcher] Language changed to', e.detail.language);
        // Update the time ago text in the disclaimer
        if (CurrencySwitcher.rateLastUpdated) {
            CurrencySwitcher.updateDisclaimerRate();
        }
    });

})();
