(() => {
  const instagramHandle = "tahliacafe";

  const feedItems = [
    {
      title: "Gold Latte Pour",
      caption: "Saffron-cardamom espresso finished with a premium glow.",
      bg: "radial-gradient(circle at 35% 25%, #f3d99a 0 10%, transparent 11%), radial-gradient(circle at 60% 55%, #6f3f1f 0 18%, transparent 19%), linear-gradient(135deg, #1a100c, #4a2c1d 45%, #d7b56d)"
    },
    {
      title: "Tahlia Morning",
      caption: "Breakfast boards, Arabic coffee, and soft Riyadh light.",
      bg: "radial-gradient(circle at 72% 28%, #f8ead0 0 12%, transparent 13%), radial-gradient(circle at 28% 70%, #7d4b2b 0 18%, transparent 19%), linear-gradient(135deg, #12100f, #5a3422 48%, #c89558)"
    },
    {
      title: "Kunafa Hour",
      caption: "Warm kunafa, pistachio, and rose syrup moments.",
      bg: "radial-gradient(circle at 48% 42%, #f5d58a 0 18%, transparent 19%), radial-gradient(circle at 70% 72%, #8d5a2e 0 16%, transparent 17%), linear-gradient(135deg, #160d0b, #6a3b24 50%, #e2b66d)"
    },
    {
      title: "Cold Brew Clear Ice",
      caption: "18-hour cold brew served over sculpted clear ice.",
      bg: "radial-gradient(circle at 52% 45%, rgba(255,255,255,0.82) 0 13%, transparent 14%), radial-gradient(circle at 38% 38%, #5b351f 0 22%, transparent 23%), linear-gradient(135deg, #0c0f14, #1f3340 50%, #d7b56d)"
    },
    {
      title: "Evening Seating",
      caption: "Warm lighting, modern textures, and premium hospitality.",
      bg: "radial-gradient(circle at 68% 32%, #d7b56d 0 10%, transparent 11%), radial-gradient(circle at 30% 70%, #24202a 0 20%, transparent 21%), linear-gradient(135deg, #09090b, #2a2030 48%, #9b7132)"
    },
    {
      title: "Date Cheesecake",
      caption: "Saudi date caramel with smooth cheesecake and rose petals.",
      bg: "radial-gradient(circle at 42% 36%, #f6dfb5 0 14%, transparent 15%), radial-gradient(circle at 62% 64%, #8b4a2a 0 18%, transparent 19%), linear-gradient(135deg, #160d0b, #6b3322 46%, #d7b56d)"
    }
  ];

  function init() {
    initMobileNavigation();
    initMenuFilters();
    renderInstagramFeed();
    initAnchorFocus();
  }

  function initMobileNavigation() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("mobileNav");

    if (!toggle || !nav) return;

    const setOpen = (open) => {
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false);
    });
  }

  function initMenuFilters() {
    const tabs = Array.from(document.querySelectorAll(".menu-tab"));
    const cards = Array.from(document.querySelectorAll(".menu-card"));

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.dataset.filter || "all";

        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });

        cards.forEach((card) => {
          const visible = filter === "all" || card.dataset.category === filter;
          card.hidden = !visible;
        });
      });
    });
  }

  function renderInstagramFeed() {
    const feed = document.getElementById("instagramFeed");
    if (!feed) return;

    feed.innerHTML = feedItems.map((item, index) => {
      const href = `https://www.instagram.com/${instagramHandle}/`;
      const label = `${item.title} - ${item.caption}`;
      return `
        <a class="instagram-card" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}" style="--feed-bg: ${item.bg}">
          <span class="instagram-caption">
            <strong>${item.title}</strong>
            <span>${item.caption}</span>
          </span>
        </a>
      `;
    }).join("");
  }

  function initAnchorFocus() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        link.blur();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
