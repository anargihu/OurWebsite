const navbar = document.querySelector(".navbar");
const nav = document.querySelector("nav");
const cards = document.querySelectorAll(".card");

const menuButton = document.createElement("button");
menuButton.className = "menu-button";
menuButton.textContent = "☰";
menuButton.setAttribute("aria-label", "Open menu");
menuButton.setAttribute("type", "button");

navbar.appendChild(menuButton);

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("mobile-open");

  menuButton.textContent = open ? "✕" : "☰";
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("mobile-open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open menu");
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 80}ms`;
  observer.observe(card);
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    nav.classList.remove("mobile-open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open menu");
  }
});