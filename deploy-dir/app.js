/* ============================================
    Al-Nil Restaurant — App JS
    Premium Interactions
    ============================================ */

(() => {
    'use strict';

    /* ---------- DOM References ---------- */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('msgModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalClose = modal.querySelector('.modal-close');
    const modalAction = modal.querySelector('.modal-action');
    const currentYear = document.getElementById('currentYear');
    const reveals = document.querySelectorAll('.reveal');

    /* ---------- Year ---------- */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* ---------- Mobile Menu ---------- */
    const toggleMenu = (open) => {
        const isOpen = open ?? !navMenu.classList.contains('open');
        navMenu.classList.toggle('open', isOpen);
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => toggleMenu());
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) toggleMenu(false);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) toggleMenu(false);
    });

    /* ---------- Scroll: Nav state ---------- */
    const updateNav = () => {
        const scrolled = window.scrollY > 60;
        navbar.classList.toggle('scrolled', scrolled);
    };

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    /* ---------- Scroll: Reveal animations ---------- */
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    /* ---------- Smooth scroll (fallback) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.getBoundingClientRect().height;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ---------- Modal ---------- */
    const openModal = (message) => {
        modalMessage.textContent = message;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalAction.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    /* ---------- Contact Form ---------- */
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const guests = contactForm.guests.value;

            if (!name) {
                openModal('Please enter your full name.');
                contactForm.name.focus();
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email)) {
                openModal('Please enter a valid email address.');
                contactForm.email.focus();
                return;
            }

            if (!guests) {
                openModal('Please select the party size.');
                contactForm.guests.focus();
                return;
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending…';
            btn.disabled = true;

            // Simulate async submission (zero-cost; no external API required)
            setTimeout(() => {
                openModal(
                    `Thank you, ${name}. We have received your reservation request for ${guests} guest(s). We will confirm via email shortly.`
                );
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 600);
        });
    }

    /* ---------- Lazy image fallback ---------- */
    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', () => {
            const wrapper = img.closest('.menu-image, .about-image-inner, .gallery-item');
            if (wrapper) {
                wrapper.style.background =
                    'linear-gradient(135deg, #e8e3db 0%, #d4cfc6 100%)';
                img.style.display = 'none';
            }
        });
    });
})();
