'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const preloader = document.querySelector('[data-preloader]');
const circle = document.querySelector('[data-circle]');

window.addEventListener('load', function () {
  if (preloader) preloader.classList.add('loaded');
  if (circle) circle.style.animation = 'none';
  document.body.classList.add('loaded');
});

const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const toggleNavbar = function () {
  if (!navbar || !overlay) return;

  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};

const closeNavbar = function () {
  if (!navbar || !overlay) return;

  navbar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('nav-active');
};

if (navTogglers.length) addEventOnElements(navTogglers, 'click', toggleNavbar);
if (navLinks.length) addEventOnElements(navLinks, 'click', closeNavbar);

const header = document.querySelector('[data-header]');

const headerActive = function () {
  if (!header) return;

  if (window.scrollY > 100) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
};

window.addEventListener('scroll', headerActive);
headerActive();

const yearNode = document.querySelector('[data-current-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector('[data-contact-form]');
const feedback = document.querySelector('[data-form-feedback]');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const inquiryType = String(formData.get('inquiryType') || '').trim();
    const program = String(formData.get('program') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !phone || !inquiryType || !program || !message) {
      if (feedback) feedback.textContent = 'Complete all fields before sending your inquiry.';
      return;
    }

    const whatsappMessage = [
      'Hello SkilForge Academy,',
      `Name/School: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Inquiry Type: ${inquiryType}`,
      `Program/Subject: ${program}`,
      `Message: ${message}`
    ].join('\n');

    const whatsappUrl = `https://wa.me/2349028367079?text=${encodeURIComponent(whatsappMessage)}`;

    if (feedback) feedback.textContent = 'Opening WhatsApp with your inquiry details.';
    window.open(whatsappUrl, '_blank', 'noopener');
  });
}
