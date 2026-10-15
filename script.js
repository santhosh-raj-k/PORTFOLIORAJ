// ---------- Mobile side drawer ----------
// Animations are OFF on page load / resize, so the drawer never
// flashes or slides on its own. They turn ON only when the user opens it.
const menuBtn = document.getElementById("menuBtn");
const menuClose = document.getElementById("menuClose");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");

function setAnim(on) {
  navLinks.classList.toggle("anim", on);
  navOverlay.classList.toggle("anim", on);
  void navLinks.offsetWidth; // apply instantly
}

function setMenu(open) {
  if (open) setAnim(true);
  navLinks.classList.toggle("open", open);
  navOverlay.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  document.documentElement.style.overflow = open ? "hidden" : "";
}

menuBtn.addEventListener("click", () => setMenu(true));
menuClose.addEventListener("click", () => setMenu(false));
navOverlay.addEventListener("click", () => setMenu(false));

navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    if (innerWidth < 768) setMenu(false);
  })
);

addEventListener("resize", () => {
  setAnim(false);
  setMenu(false);
});

// ---------- Seamless skills marquee ----------
const track = document.getElementById("skillTrack");
[...track.children].forEach((el) => {
  const c = el.cloneNode(true);
  c.setAttribute("aria-hidden", "true");
  c.querySelector("img").alt = "";
  track.appendChild(c);
});

// Pause marquee when off-screen
new IntersectionObserver(([e]) => {
  track.style.animationPlayState = e.isIntersecting ? "" : "paused";
}).observe(track);

// ---------- Active nav link ----------
const anchors = [...navLinks.querySelectorAll("a.nav-a")];
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        anchors.forEach((a) => a.removeAttribute("aria-current"));
        const a = anchors.find(
          (x) => x.getAttribute("href") === "#" + e.target.id
        );
        if (a) a.setAttribute("aria-current", "true");
      }
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
