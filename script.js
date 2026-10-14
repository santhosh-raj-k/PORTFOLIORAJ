// ===== Mobile side drawer =====
const menuBtn = document.getElementById("menuBtn");
const menuClose = document.getElementById("menuClose");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  navOverlay.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  document.documentElement.style.overflow = open ? "hidden" : "";
}

menuBtn.addEventListener("click", () => setMenu(true));
menuClose.addEventListener("click", () => setMenu(false));
navOverlay.addEventListener("click", () => setMenu(false));

// Mobile-la link click pannumbodhu drawer close aagum
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => setMenu(false))
);

// 1024px breakpoint-ah cross pannum pothu mattum close pannum
window
  .matchMedia("(min-width: 1024px)")
  .addEventListener("change", () => setMenu(false));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Page full-ah load aana appuram, rendu frame kazhichu dhan transition on aagum
window.addEventListener("click", () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add("nav-ready");
    });
  });
});

// ===== Seamless skills marquee =====
const track = document.getElementById("skillTrack");

[...track.children].forEach((el) => {
  const clone = el.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  clone.querySelector("img").alt = "";
  track.appendChild(clone);
});

// Marquee screen-ku veliya irundha pause aagum
new IntersectionObserver(([entry]) => {
  track.style.animationPlayState = entry.isIntersecting ? "" : "paused";
}).observe(track);

// ===== Active nav link highlight =====
const navAnchors = [...navLinks.querySelectorAll("a.nav-a")];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => a.removeAttribute("aria-current"));
      const match = navAnchors.find(
        (a) => a.getAttribute("href") === "#" + entry.target.id
      );
      if (match) match.setAttribute("aria-current", "true");
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

// ===== Contact form -> mail app =====
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const customSubject = document.getElementById("subject").value.trim();

  const subject = encodeURIComponent(
    customSubject || "Portfolio contact from " + name
  );
  const body = encodeURIComponent(
    message + "\n\nFrom: " + name + " (" + email + ")"
  );

  location.href =
    "mailto:santhoshkathirkk@gmail.com?subject=" + subject + "&body=" + body;
});