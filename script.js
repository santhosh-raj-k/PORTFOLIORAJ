
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MOBILE SIDE NAVIGATION
  // ==========================================

  const menuBtn = document.getElementById("menuBtn");
  const menuClose = document.getElementById("menuClose");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  function setMenu(open) {
    if (!menuBtn || !navLinks || !navOverlay) return;

    navLinks.classList.toggle("open", open);
    navOverlay.classList.toggle("open", open);

    menuBtn.setAttribute("aria-expanded", String(open));
    navOverlay.setAttribute("aria-hidden", String(!open));

    document.documentElement.style.overflow = open ? "hidden" : "";
  }

  if (menuBtn && menuClose && navLinks && navOverlay) {
    // Open menu
    menuBtn.addEventListener("click", () => {
      setMenu(true);
    });

    // Close menu
    menuClose.addEventListener("click", () => {
      setMenu(false);
    });

    // Close when clicking outside the drawer
    navOverlay.addEventListener("click", () => {
      setMenu(false);
    });

    // Close when clicking any navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenu(false);
      });
    });

    // Close with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenu(false);
      }
    });

    // Close when switching to desktop layout
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    desktopQuery.addEventListener("change", (event) => {
      if (event.matches) {
        setMenu(false);
      }
    });

    // Ensure the menu starts closed
    setMenu(false);
  }

  // ==========================================
  // 2. SEAMLESS SKILLS MARQUEE
  // ==========================================

  const track = document.getElementById("skillTrack");

  if (track && !track.dataset.cloned) {
    const originalSkills = Array.from(track.children);

    originalSkills.forEach((skill) => {
      const clone = skill.cloneNode(true);

      // Hide duplicate items from screen readers
      clone.setAttribute("aria-hidden", "true");

      // Decorative duplicate images should have empty alt text
      const image = clone.querySelector("img");

      if (image) {
        image.alt = "";
      }

      track.appendChild(clone);
    });

    // Prevent duplicate cloning
    track.dataset.cloned = "true";
  }

  // ==========================================
  // 3. PAUSE MARQUEE OUTSIDE VIEWPORT
  // ==========================================

  if (track && "IntersectionObserver" in window) {
    const marqueeObserver = new IntersectionObserver(([entry]) => {
      track.style.animationPlayState = entry.isIntersecting
        ? "running"
        : "paused";
    });

    marqueeObserver.observe(track);
  }

  // ==========================================
  // 4. ACTIVE NAVIGATION LINK HIGHLIGHT
  // ==========================================

  const navAnchors = Array.from(
    document.querySelectorAll("#navLinks a.nav-a")
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navAnchors.forEach((anchor) => {
            anchor.removeAttribute("aria-current");
          });

          const activeLink = navAnchors.find((anchor) => {
            return (
              anchor.getAttribute("href") === `#${entry.target.id}`
            );
          });

          if (activeLink) {
            activeLink.setAttribute("aria-current", "true");
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
      }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ==========================================
  // 5. CONTACT FORM - OPEN DEFAULT MAIL APP
  // ==========================================

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      const subjectInput = document.getElementById("subject");

      const name = nameInput?.value.trim() || "";
      const email = emailInput?.value.trim() || "";
      const message = messageInput?.value.trim() || "";
      const customSubject = subjectInput?.value.trim() || "";

      const subject = encodeURIComponent(
        customSubject || `Portfolio contact from ${name}`
      );

      const body = encodeURIComponent(
        `${message}\n\nFrom: ${name} (${email})`
      );

      const mailtoURL =
        `mailto:santhoshkathirkk@gmail.com` +
        `?subject=${subject}&body=${body}`;

      window.location.href = mailtoURL;
    });
  }
});
