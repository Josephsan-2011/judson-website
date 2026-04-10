(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var nav = document.querySelector('.nav');
  var navLinks = document.querySelector('.nav-links');
  var navToggle = document.querySelector('.nav-toggle');

  // Header scroll state
  function updateHeaderScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // Parallax: hero and impact background layers
  var heroBg = document.querySelector('.hero-bg');
  var impactBg = document.querySelector('.impact-bg');
  var impactSection = document.querySelector('.impact');
  var ticking = false;

  function getReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function updateParallax() {
    if (getReducedMotion()) return;
    var scrollY = window.scrollY;
    if (heroBg) {
      var heroRate = 0.38;
      heroBg.style.transform = 'translate3d(0, ' + (scrollY * heroRate) + 'px, 0)';
    }
    if (impactBg && impactSection) {
      var impactRect = impactSection.getBoundingClientRect();
      var impactRate = 0.2;
      var impactOffset = Math.max(0, -impactRect.top);
      impactBg.style.transform = 'translate3d(0, ' + (impactOffset * impactRate) + 'px, 0)';
    }
    ticking = false;
  }

  function onScrollParallax() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  if (heroBg || impactBg) {
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    updateParallax();
  }

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close menu when a link is clicked (for anchor links)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // Optional: smooth form submit placeholder (replace with real endpoint)
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // In production, send to your server or form service
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    });
  }
})();
