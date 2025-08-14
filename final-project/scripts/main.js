/**
 * Global script for AutoRent Pro website.
 * Handles mobile navigation and active link highlighting.
 * This script is loaded on every page.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Selections for Global Elements ---
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");
    const contactForm = document.getElementById("contact-form");

    /**
     * Toggles the mobile navigation menu visibility.
     * Modifies the DOM by adding/removing 'active' and 'nav-open' classes.
     */
    function toggleMobileNav() {
      mainNav.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    }

    /**
     * Highlights the current page's link in the navigation bar for better UX.
     * Selects DOM elements and modifies their class.
     */
    function highlightActiveLink() {
      const navLinks = document.querySelectorAll(".main-nav a");
      const currentPageUrl = window.location.pathname;

      navLinks.forEach((link) => {
        // Conditional branching to check if the link's href matches the current page.
        if (link.pathname === currentPageUrl) {
          link.classList.add("active");
        }
      });
    }

    /**
     * Handles the submission of the contact form on contact.html.
     * @param {Event} event - The submit event.
     */
    function handleContactSubmit(event) {
      event.preventDefault(); // Prevent default form submission
      const form = event.target;
      const messageContainer = document.getElementById("contact-form-message");
      const formData = new FormData(form);
      const name = formData.get("name");

      // Template literal for personalized message
      displayFormMessage(
        messageContainer,
        `Thank you, ${name}! Your message has been sent.`,
        "success"
      );

      form.reset();
    }

    /**
     * Displays a status message for a form.
     * @param {HTMLElement} container - The element to display the message in.
     * @param {string} message - The message text.
     * @param {string} type - 'success' or 'error'.
     */
    function displayFormMessage(container, message, type) {
      if (!container) return;
      container.textContent = message;
      container.className = `form-status-message ${type}`; // Reset classes and add new ones

      // Hide the message after 5 seconds
      setTimeout(() => {
        container.textContent = "";
        container.className = "form-status-message";
      }, 5000);
    }

    // --- Event Listeners ---
    // Listens for a click event on the nav-toggle button.
    if (navToggle) {
      navToggle.addEventListener("click", toggleMobileNav);
    }

    // Listens for a submit event on the contact form.
    if (contactForm) {
      contactForm.addEventListener("submit", handleContactSubmit);
    }

    // --- Initial Execution ---
    highlightActiveLink();
  });
})();
