(function() {
    
    function initApp() {
        initNavigation();
        initGSAPAnimations();
        initSmoothScroll();
        initParallax();
        initActiveNavHighlight();
        initHeaderScroll();
        initGalleryHover();
        reportReady();
    }

    
    function initNavigation() {
        const toggle = document.getElementById("navToggle");
        const nav = document.getElementById("mainNav");
        const links = document.querySelectorAll(".nav-link");

        if (!toggle || !nav) return;

        toggle.addEventListener("click", function(toggleNav) {
            const isOpen = nav.classList.contains("open");
            if (isOpen) {
                nav.classList.remove("open");
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            } else {
                nav.classList.add("open");
                toggle.classList.add("active");
                toggle.setAttribute("aria-expanded", "true");
            }
        });

        links.forEach(function(link) {
            link.addEventListener("click", function() {
                nav.classList.remove("open");
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", function(e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains("open")) {
                nav.classList.remove("open");
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    function initGSAPAnimations() {
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        
        var heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTimeline
            .from(".hero-subtitle", { opacity: 0, duration: 2.8, delay: 0.5, y: 30 })
            .from(".hero-title", { opacity: 0, duration: 2.8, y: 50 }, "-=2.6")
            .from(".hero-description", { opacity: 0, duration: 2.6, y: 30 }, "-=2.4")
            .from(".feature", { opacity: 0, duration: 2.4, y: 25, stagger: 0.2 }, "-=2.2")
            .from(".hero-buttons .cta-button", { opacity: 0, duration: 2.4, y: 25, stagger: 0.2 }, "-=2.0")
            .from(".scroll-indicator", { opacity: 0, duration: 2.2, y: 20 }, "-=1.8");

        
        gsap.from(".about-card", {
            scrollTrigger: {
                trigger: ".about-preview",
                start: "top 75%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            duration: 1.4,
            y: 60,
            stagger: 0.25,
            ease: "power3.out",
        });

        
        gsap.from(".section-title", {
            scrollTrigger: {
                trigger: ".menu-section",
                start: "top 78%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            duration: 1.2,
            y: 40,
            ease: "power3.out",
        });

        gsap.from(".menu-category", {
            scrollTrigger: {
                trigger: ".menu-section",
                start: "top 70%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            duration: 1.2,
            y: 50,
            stagger: 0.18,
            ease: "power3.out",
        });

        
        gsap.from(".gallery-item", {
            scrollTrigger: {
                trigger: ".gallery-section",
                start: "top 75%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            duration: 1.2,
            scale: 0.9,
            stagger: 0.12,
            ease: "power3.out",
        });

        
        gsap.from(".contact-card", {
            scrollTrigger: {
                trigger: ".contact-section",
                start: "top 75%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            duration: 1.2,
            y: 50,
            stagger: 0.2,
            ease: "power3.out",
        });

        
        gsap.from(".whatsapp-cta-content", {
            scrollTrigger: {
                trigger: ".whatsapp-cta-section",
                start: "top 80%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            duration: 1.6,
            y: 40,
            ease: "power3.out",
        });

        
        ScrollTrigger.defaults({ toggleActions: "play none none none" });
        ScrollTrigger.refresh();
    }

    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener("click", function(e) {
                var targetId = this.getAttribute("href");
                if (targetId === "#") return;
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    var headerOffset = 72;
                    var elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    var offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    
    function initParallax() {
        var heroBg = document.querySelector(".hero-bg");
        var heroOverlay = document.querySelector(".hero-overlay");
        var ticking = false;

        function updateParallax() {
            var scrollY = window.pageYOffset;
            if (heroBg) {
                heroBg.style.transform = "translateY(" + scrollY * 0.5 + "px)";
            }
            if (heroOverlay) {
                heroOverlay.style.transform = "translateY(" + scrollY * 0.2 + "px)";
            }
            ticking = false;
        }

        window.addEventListener("scroll", function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    
    function initActiveNavHighlight() {
        var sections = document.querySelectorAll("section[id]");
        var navLinks = document.querySelectorAll(".nav-link");

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute("id");
                    navLinks.forEach(function(link) {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === "#" + id) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(function(section) {
            observer.observe(section);
        });
    }

    
    function initHeaderScroll() {
        var header = document.getElementById("header");
        if (!header) return;
        var lastScroll = 0;

        window.addEventListener("scroll", function() {
            var currentScroll = window.pageYOffset;
            if (currentScroll > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
            lastScroll = currentScroll;
        });
    }

    
    function initGalleryHover() {
        var items = document.querySelectorAll(".gallery-item");
        items.forEach(function(item) {
            item.addEventListener("mouseenter", function() {
                if (typeof gsap !== "undefined") {
                    gsap.to(item, { duration: 0.4, ease: "power2.out" });
                }
            });
            item.addEventListener("mouseleave", function() {
                if (typeof gsap !== "undefined") {
                    gsap.to(item, { duration: 0.4, ease: "power2.out" });
                }
            });
        });
    }

    
    function reportReady() {
        if (typeof console !== "undefined") {
            console.log("[Al-Tahlia Cafe] App initialized successfully.");
            console.log("[Al-Tahlia Cafe] GSAP v" + (typeof gsap !== "undefined" ? gsap.version : "N/A"));
            console.log("[Al-Tahlia Cafe] ScrollTrigger: " + (typeof ScrollTrigger !== "undefined" ? "loaded" : "N/A"));
        }
    }

    
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initApp);
    } else {
        initApp();
    }
})();
