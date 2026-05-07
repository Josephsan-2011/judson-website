(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var navPrimary = document.getElementById('nav-primary');
  var navToggle = document.getElementById('nav-toggle');

  function updateHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

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
      heroBg.style.transform = 'translate3d(0, ' + (scrollY * 0.38) + 'px, 0)';
    }
    if (impactBg && impactSection) {
      var impactRect = impactSection.getBoundingClientRect();
      var impactOffset = Math.max(0, -impactRect.top);
      impactBg.style.transform = 'translate3d(0, ' + (impactOffset * 0.2) + 'px, 0)';
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

  function isMobileNav() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  if (navToggle && navPrimary) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      var open = navPrimary.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (!open) {
        document.querySelectorAll('.nav-dropdown--open').forEach(function (el) {
          el.classList.remove('nav-dropdown--open');
        });
        document.querySelectorAll('.nav-dropdown-trigger').forEach(function (btn) {
          btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.querySelectorAll('.nav-primary a[href]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (isMobileNav()) {
          navPrimary.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open menu');
        }
      });
    });
  }

  document.querySelectorAll('.nav-item--has-dropdown').forEach(function (item) {
    var btn = item.querySelector('.nav-dropdown-trigger');
    var menu = item.querySelector('.nav-dropdown-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function (e) {
      if (!isMobileNav()) {
        return;
      }
      e.preventDefault();
      var willOpen = !item.classList.contains('nav-dropdown--open');
      document.querySelectorAll('.nav-item--has-dropdown').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('nav-dropdown--open');
          var ob = other.querySelector('.nav-dropdown-trigger');
          if (ob) ob.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('nav-dropdown--open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    });
  }
})();
