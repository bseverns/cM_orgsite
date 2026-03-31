(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsFinePointer = window.matchMedia('(pointer: fine)');

  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-menu] a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('mailto:')) {
        return;
      }

      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('is-active');
      }
    });
  }

  function setupNav() {
    const header = document.querySelector('[data-site-header]');
    const toggle = document.querySelector('[data-nav-toggle]');
    const menu = document.querySelector('[data-nav-menu]');

    const onScroll = function () {
      if (header) {
        header.classList.toggle('site-header--scrolled', window.scrollY > 16);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!toggle || !menu) {
      return;
    }

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function setupReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -32px 0px' }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  function setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length || !('IntersectionObserver' in window)) {
      return;
    }

    const animateCounter = function (element) {
      const target = Number(element.dataset.count || '0');
      const prefix = element.dataset.prefix || '';
      const suffix = element.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = prefix + value.toLocaleString() + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(frame);
        } else {
          const card = element.closest('.metric');
          if (card) {
            card.classList.remove('is-counted');
            void card.offsetWidth;
            card.classList.add('is-counted');
          }
        }
      }

      window.requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function setupMagicSurfaces() {
    const surfaces = document.querySelectorAll(
      '.hero-visual, .surface-card, .route-card, .feature-card, .detail-card, .proof-card, .timeline-card, .contact-card, .quote-card, .cta-card, .program-card, .metric, .overlay-note'
    );

    surfaces.forEach((surface) => surface.classList.add('magic-surface'));

    if (prefersReducedMotion.matches || !supportsFinePointer.matches) {
      return;
    }

    surfaces.forEach((surface) => {
      surface.addEventListener('pointermove', function (event) {
        const rect = surface.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        const artShiftX = ((x - 50) / 50) * 3;
        const artShiftY = ((y - 50) / 50) * 3;

        surface.style.setProperty('--magic-x', x.toFixed(2) + '%');
        surface.style.setProperty('--magic-y', y.toFixed(2) + '%');
        surface.style.setProperty('--magic-opacity', '1');
        surface.style.setProperty('--art-shift-x', artShiftX.toFixed(2) + 'px');
        surface.style.setProperty('--art-shift-y', artShiftY.toFixed(2) + 'px');
      });

      surface.addEventListener('pointerleave', function () {
        surface.style.setProperty('--magic-opacity', '0');
        surface.style.setProperty('--art-shift-x', '0px');
        surface.style.setProperty('--art-shift-y', '0px');
      });
    });
  }

  function setupButtonRipples() {
    const buttons = document.querySelectorAll('.button');

    if (prefersReducedMotion.matches) {
      return;
    }

    buttons.forEach((button) => {
      button.addEventListener('pointerdown', function (event) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'button-ripple';
        ripple.style.left = event.clientX - rect.left + 'px';
        ripple.style.top = event.clientY - rect.top + 'px';
        button.appendChild(ripple);

        window.setTimeout(function () {
          ripple.remove();
        }, 760);
      });
    });
  }

  function setupContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const successPanel = document.getElementById('sentConfirmation');
    const submitButton = document.getElementById('submitButton');
    const honeypot = document.getElementById('hp_website');
    const nextField = document.getElementById('formNext');
    const interestField = document.getElementById('interest');
    const url = new URL(window.location.href);
    const interest = url.searchParams.get('interest');

    if (interest && interestField) {
      interestField.value = interest;
    }

    if (nextField && /^https?:$/.test(window.location.protocol)) {
      nextField.value = window.location.origin + window.location.pathname + '?sent=true';
    }

    if (url.searchParams.get('sent') === 'true' && form && successPanel) {
      form.style.display = 'none';
      successPanel.classList.add('is-visible');
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }

    if (!form) {
      return;
    }

    const question = document.getElementById('captchaQuestion');
    const answer = document.getElementById('captchaAnswer');
    let expectedAnswer = null;

    function renderCaptcha() {
      if (!question || !answer) {
        return;
      }

      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      expectedAnswer = a + b;
      question.textContent = 'What is ' + a + ' + ' + b + '?';
      answer.value = '';
    }

    renderCaptcha();

    form.addEventListener('submit', function (event) {
      if (status) {
        status.textContent = '';
        status.classList.remove('is-error');
      }

      if (honeypot && honeypot.value) {
        event.preventDefault();
        return;
      }

      if (answer && expectedAnswer !== null) {
        const submittedAnswer = Number(answer.value);
        if (!Number.isFinite(submittedAnswer) || submittedAnswer !== expectedAnswer) {
          event.preventDefault();
          if (status) {
            status.textContent = 'Please complete the math question before sending.';
            status.classList.add('is-error');
          }
          renderCaptcha();
          answer.focus();
          return;
        }
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLink();
    setupNav();
    setupReveal();
    setupCounters();
    setupMagicSurfaces();
    setupButtonRipples();
    setupContactForm();
  });
})();
