const navbar = document.querySelector(".navbar");
const nav = document.querySelector("nav");
const cards = document.querySelectorAll(".card");
const buttons = document.querySelectorAll(".button");
const navLinks = document.querySelectorAll("nav a");

const menuButton = document.createElement("button");
menuButton.className = "menu-button";
menuButton.textContent = "☰";
menuButton.setAttribute("aria-label", "Open menu");
navbar.appendChild(menuButton);

menuButton.addEventListener("click", () => {
  nav.classList.toggle("mobile-open");
  menuButton.textContent = nav.classList.contains("mobile-open") ? "✕" : "☰";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("mobile-open");
    menuButton.textContent = "☰";
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

cards.forEach(card => observer.observe(card));

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});