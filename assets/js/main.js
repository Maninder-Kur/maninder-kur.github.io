// ===== SHOW MENU =====
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
      toggle.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

// ===== REMOVE MENU ON LINK CLICK =====
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  navMenu.classList.remove("show");
  navToggle.classList.remove("show");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

// ===== SCROLL ACTIVE SECTION =====
const scrollActive = () => {
  const scrollY = window.pageYOffset;

  const sections = document.querySelectorAll("section[id]");

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 200;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
};

window.addEventListener("scroll", scrollActive);

// ===== SCROLL REVEAL ANIMATION =====
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  delay: 200,
  reset: true,
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .skills__img", { delay: 400 });
sr.reveal(".home__social-icon", { delay: 600, interval: 200 });
sr.reveal(".about__data, .skills__data", { delay: 400 });
sr.reveal(".contact__input", { delay: 800, interval: 100 });

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    if (name && email && message) {
      // Simulate form submission
      alert(`Thank you, ${name}! Your message has been received.`);
      contactForm.reset();
    } else {
      alert("Please fill in all fields");
    }
  });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById("scroll-top");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===== PARALLAX EFFECT =====
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  parallaxElements.forEach((element) => {
    const speed = element.getAttribute("data-parallax");
    element.style.transform = `translateY(${scrollPos * speed}px)`;
  });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.6s ease-out";
  observer.observe(section);
});

// Observe all cards
document.querySelectorAll('[class*="__card"]').forEach((el) => {
  observer.observe(el);
});
