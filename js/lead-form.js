/**
 * Lead Form - Download PDF after registration
 * Sends data to Google Sheets via Apps Script
 */

(function() {
  'use strict';

  // Configuration - Replace with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7ehzawblfVzS4dXvU3lmeg7oClgx9gY4H7YIMsDFdLHApL0gyCIKEtsueJx0pFUas2w/exec';

  // PDF files mapping
  const PDF_FILES = {
    'buyers-guide': {
      title: 'Buyers Guide',
      titleEs: 'Guía del Comprador',
      file: 'source/Buyers Guide.pdf'
    },
    'sellers-guide': {
      title: 'Sellers Guide',
      titleEs: 'Guía del Vendedor',
      file: 'source/Sellers Guide .pdf'
    },
    'presale-guide': {
      title: 'Pre-Sale Buyers Guide',
      titleEs: 'Guía de Preventa',
      file: 'source/Pre-Sale Buyers Guide.pdf'
    }
  };

  // Current guide being requested
  let currentGuide = null;

  // DOM Elements
  let modal, form, successView, errorMessage, submitBtn;

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    createModal();
    bindEvents();
  });

  /**
   * Create the modal HTML structure
   */
  function createModal() {
    const modalHTML = `
      <div id="leadModal" class="lead-modal-overlay">
        <div class="lead-modal">
          <div class="lead-modal-header">
            <button type="button" class="lead-modal-close" aria-label="Close">&times;</button>
            <h2 class="lead-modal-title" id="leadModalTitle">Download Free Guide</h2>
            <p class="lead-modal-subtitle" data-i18n="leadForm.subtitle">Complete the form to receive your free guide</p>
          </div>

          <div class="lead-modal-body" id="leadModalBody">
            <div class="lead-form-error" id="leadFormError"></div>

            <form id="leadForm">
              <div class="lead-form-group">
                <label for="leadName">
                  <span data-i18n="leadForm.name">Full Name</span>
                  <span class="required">*</span>
                </label>
                <input type="text" id="leadName" name="name" required
                       placeholder="John Doe" data-i18n-placeholder="leadForm.namePlaceholder">
              </div>

              <div class="lead-form-group">
                <label for="leadEmail">
                  <span data-i18n="leadForm.email">Email</span>
                  <span class="required">*</span>
                </label>
                <input type="email" id="leadEmail" name="email" required
                       placeholder="john@example.com" data-i18n-placeholder="leadForm.emailPlaceholder">
              </div>

              <div class="lead-form-group">
                <label for="leadPhone">
                  <span data-i18n="leadForm.phone">Phone</span>
                </label>
                <input type="tel" id="leadPhone" name="phone"
                       placeholder="+1 (555) 123-4567" data-i18n-placeholder="leadForm.phonePlaceholder">
              </div>

              <div class="lead-form-group">
                <label for="leadInterest">
                  <span data-i18n="leadForm.interest">Interest</span>
                </label>
                <select id="leadInterest" name="interest">
                  <option value="" data-i18n="leadForm.selectOption">Select an option</option>
                  <option value="buying" data-i18n="leadForm.buying">Buying a property</option>
                  <option value="selling" data-i18n="leadForm.selling">Selling a property</option>
                  <option value="investing" data-i18n="leadForm.investing">Investment opportunities</option>
                  <option value="renting" data-i18n="leadForm.renting">Renting</option>
                  <option value="other" data-i18n="leadForm.other">Other</option>
                </select>
              </div>

              <div class="lead-form-group lead-form-checkbox">
                <input type="checkbox" id="leadConsent" name="consent" required>
                <label for="leadConsent" data-i18n="leadForm.consent">
                  I agree to receive communications from Poncho Dávalos Real Estate.
                  <a href="#" target="_blank">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" class="lead-form-submit" id="leadSubmitBtn">
                <span class="spinner"></span>
                <span class="btn-text" data-i18n="leadForm.submit">Download Guide</span>
              </button>
            </form>
          </div>

          <div class="lead-modal-success" id="leadModalSuccess">
            <div class="lead-modal-success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 data-i18n="leadForm.successTitle">Thank you!</h3>
            <p data-i18n="leadForm.successMessage">Your guide is ready for download.</p>
            <a href="#" class="download-btn" id="downloadLink" download>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span data-i18n="leadForm.downloadBtn">Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Cache DOM elements
    modal = document.getElementById('leadModal');
    form = document.getElementById('leadForm');
    successView = document.getElementById('leadModalSuccess');
    errorMessage = document.getElementById('leadFormError');
    submitBtn = document.getElementById('leadSubmitBtn');
  }

  /**
   * Bind event listeners
   */
  function bindEvents() {
    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close button
    modal.querySelector('.lead-modal-close').addEventListener('click', closeModal);

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Form submission
    form.addEventListener('submit', handleSubmit);

    // Bind click events to guide cards
    document.querySelectorAll('[data-guide]').forEach(function(card) {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        const guideId = this.getAttribute('data-guide');
        openModal(guideId);
      });
    });
  }

  /**
   * Open the modal for a specific guide
   */
  function openModal(guideId) {
    currentGuide = PDF_FILES[guideId];

    if (!currentGuide) {
      console.error('Guide not found:', guideId);
      return;
    }

    // Update modal title
    const lang = localStorage.getItem('language') || 'en';
    const title = lang === 'es' ? currentGuide.titleEs : currentGuide.title;
    document.getElementById('leadModalTitle').textContent =
      lang === 'es' ? `Descargar ${title}` : `Download ${title}`;

    // Reset form state
    form.reset();
    errorMessage.classList.remove('active');
    errorMessage.textContent = '';
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;

    // Show form, hide success
    document.getElementById('leadModalBody').classList.remove('hidden');
    successView.classList.remove('active');

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(function() {
      document.getElementById('leadName').focus();
    }, 100);

    // Re-apply translations if i18n is available
    if (typeof applyTranslations === 'function') {
      applyTranslations();
    }
  }

  /**
   * Close the modal
   */
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentGuide = null;
  }

  /**
   * Handle form submission
   */
  async function handleSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('leadName').value.trim(),
      email: document.getElementById('leadEmail').value.trim(),
      phone: document.getElementById('leadPhone').value.trim(),
      interest: document.getElementById('leadInterest').value,
      guide: currentGuide ? currentGuide.title : 'Unknown',
      timestamp: new Date().toISOString(),
      language: localStorage.getItem('language') || 'en'
    };

    // Validate
    if (!formData.name || !formData.email) {
      showError(formData.language === 'es'
        ? 'Por favor complete todos los campos requeridos.'
        : 'Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError(formData.language === 'es'
        ? 'Por favor ingrese un email válido.'
        : 'Please enter a valid email address.');
      return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    errorMessage.classList.remove('active');

    try {
      // Send to Google Sheets
      if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        await sendToGoogleSheets(formData);
      } else {
        // Demo mode - simulate network delay
        console.log('Demo mode - Form data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Show success and download
      showSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      showError(formData.language === 'es'
        ? 'Error al enviar el formulario. Por favor intente de nuevo.'
        : 'Error submitting form. Please try again.');
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  /**
   * Send form data to Google Sheets via Apps Script
   */
  async function sendToGoogleSheets(data) {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    // no-cors mode doesn't return response body, assume success
    return true;
  }

  /**
   * Show error message
   */
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
  }

  /**
   * Show success view and trigger download
   */
  function showSuccess() {
    // Hide form, show success
    document.getElementById('leadModalBody').classList.add('hidden');
    successView.classList.add('active');

    // Set download link
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = currentGuide.file;
    downloadLink.download = currentGuide.file.split('/').pop();

    // Auto-trigger download after a brief delay
    setTimeout(function() {
      downloadLink.click();
    }, 500);
  }

  // Expose openModal globally for direct calls
  window.openLeadModal = openModal;

})();
