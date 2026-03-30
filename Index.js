const body = document.body;
body.classList.add("js-enabled");

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("main section[id], header[id]");
const servicesSection = document.getElementById("services");
const servicesToggle = document.getElementById("services-toggle");
const form = document.getElementById("consultation-form");
const formStatus = document.getElementById("form-status");
const yearSlot = document.getElementById("current-year");

const WHATSAPP_NUMBER = "918059134416";

if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

if (servicesSection && servicesToggle) {
  servicesToggle.addEventListener("click", () => {
    const expanded = servicesSection.classList.toggle("services-expanded");
    servicesToggle.setAttribute("aria-expanded", String(expanded));
    servicesToggle.textContent = expanded ? "Show Fewer Services" : "Show All 25 Services";
  });
}

const closeMenu = () => {
  body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (!body.classList.contains("nav-open")) {
    return;
  }

  const clickedInsideNav = event.target instanceof Node &&
    (navMenu?.contains(event.target) || navToggle?.contains(event.target));

  if (!clickedInsideNav) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 960) {
    closeMenu();
  }
});

const syncNavbar = () => {
  if (!navbar) {
    return;
  }

  navbar.classList.toggle("is-scrolled", window.scrollY > 16);
};

syncNavbar();
window.addEventListener("scroll", syncNavbar, { passive: true });

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentId = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        const linkTarget = link.getAttribute("href")?.replace("#", "");
        link.classList.toggle("is-active", linkTarget === currentId);
      });
    });
  }, {
    threshold: 0.5
  });

  sections.forEach((section) => sectionObserver.observe(section));
}

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    formStatus.classList.remove("is-error", "is-success");

    if (!form.checkValidity()) {
      formStatus.textContent = "Please complete the required fields before submitting.";
      formStatus.classList.add("is-error");
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const honeypot = data.get("website")?.toString().trim() || "";

    if (honeypot) {
      form.reset();
      formStatus.textContent = "Thanks! Your request has been received.";
      formStatus.classList.add("is-success");
      return;
    }

    const name = data.get("name")?.toString().trim() || "";
    const business = data.get("business")?.toString().trim() || "Not provided";
    const email = data.get("email")?.toString().trim() || "";
    const phone = data.get("phone")?.toString().trim() || "Not provided";
    const service = data.get("service")?.toString().trim() || "";
    const budget = data.get("budget")?.toString().trim() || "Not provided";
    const message = data.get("message")?.toString().trim() || "";

    const whatsappMessage = [
      "Hi Assistly WS, I want a free consultation.",
      "",
      `Name: ${name}`,
      `Business Name: ${business}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service Needed: ${service}`,
      `Budget: ${budget}`,
      "Project Goals:",
      message
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    const newWindow = window.open(whatsappUrl, "_blank", "noopener");

    if (!newWindow) {
      window.location.href = whatsappUrl;
    }

    formStatus.textContent = "Opening WhatsApp with your consultation details...";
    formStatus.classList.add("is-success");
  });
}
