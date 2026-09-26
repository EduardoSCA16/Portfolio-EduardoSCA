import "../assets/css/style.css";

const header = document.querySelector<HTMLElement>("[data-header]");
const menuToggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const navigation = document.querySelector<HTMLElement>("[data-nav]");
const pointerGlow = document.querySelector<HTMLElement>("[data-pointer-glow]");
const heroVisual = document.querySelector<HTMLElement>(".hero-visual");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

const closeMenu = (returnFocus = false) => {
  menuToggle?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("is-open");
  if (returnFocus) menuToggle?.focus();
};

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    closeMenu(true);
  }
});

document.addEventListener("click", (event) => {
  if (
    menuToggle?.getAttribute("aria-expanded") === "true" &&
    event.target instanceof Node &&
    !navigation?.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

const revealElements = document.querySelectorAll<HTMLElement>(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px" },
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(element);
  });
}

const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
const navLinks = [...(navigation?.querySelectorAll<HTMLAnchorElement>("a[href^='#']") ?? [])];

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-35% 0px -58%", threshold: 0 },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (!reduceMotion && finePointer && pointerGlow) {
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let animationFrame = 0;

  const paintGlow = () => {
    pointerGlow.style.setProperty("--pointer-x", `${pointerX}px`);
    pointerGlow.style.setProperty("--pointer-y", `${pointerY}px`);
    pointerGlow.classList.add("is-active");

    if (heroVisual && window.scrollY < window.innerHeight) {
      const offsetX = (pointerX / window.innerWidth - 0.5) * 14;
      const offsetY = (pointerY / window.innerHeight - 0.5) * 14;
      heroVisual.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    }

    animationFrame = 0;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(paintGlow);
    },
    { passive: true },
  );

  document.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--card-y", `${event.clientY - bounds.top}px`);
    });
  });
}

const year = document.querySelector<HTMLElement>("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
