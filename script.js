const cards = document.querySelectorAll(".card");
const buttons = document.querySelectorAll(".button");
const navLinks = document.querySelectorAll("nav a");

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

buttons.forEach(button => {
  button.addEventListener("click", event => {
    const target = button.getAttribute("href");

    if (target && target.startsWith("#")) {
      event.preventDefault();

      const section = document.querySelector(target);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    const target = link.getAttribute("href");

    if (target && target.startsWith("#")) {
      event.preventDefault();

      const section = document.querySelector(target);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.15
  }
);

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(25px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 30) {
    navbar.style.boxShadow = "0 8px 30px rgba(8, 168, 208, 0.12)";
  } else {
    navbar.style.boxShadow = "";
  }
});