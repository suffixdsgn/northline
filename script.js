const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  primaryNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const projects = {
  north: {
    category: "N / 01 · Архитектура",
    title: "NORTH / Архитектурное бюро",
    description: "Новая цифровая платформа для бюро современной архитектуры. Собрали портфолио в ясную редакционную систему, чтобы характер каждого пространства говорил сам за себя."
  },
  form: {
    category: "F / 02 · Предметный дизайн",
    title: "FORM / Предметный дизайн",
    description: "Интернет-магазин предметов для жизни с фокусом на тактильность, материал и детали. Спроектировали спокойный путь от знакомства с коллекцией до оформления заказа."
  },
  pulse: {
    category: "P / 03 · Финансовый сервис",
    title: "PULSE / Финансовый сервис",
    description: "Продуктовый дизайн финансового приложения, которое помогает видеть главное без лишнего шума. Сложные данные превратили в понятный и дружелюбный ежедневный опыт."
  }
};

const projectDialog = document.querySelector(".project-dialog");
const dialogCategory = document.querySelector("#dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    dialogCategory.textContent = project.category;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    projectDialog.showModal();
  });
});

projectDialog.querySelector(".dialog-close").addEventListener("click", () => {
  projectDialog.close();
});

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

projectDialog.querySelector(".text-link").addEventListener("click", () => {
  projectDialog.close();
});

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

contactForm.addEventListener("input", () => {
  formFeedback.textContent = "";
  formFeedback.classList.remove("is-error");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formFeedback.textContent = "";
  formFeedback.classList.remove("is-error");

  if (!contactForm.reportValidity()) {
    formFeedback.textContent = "Проверьте, пожалуйста, заполнение полей.";
    formFeedback.classList.add("is-error");
    return;
  }

  formFeedback.textContent = "Форма заполнена. В демо-версии отправка отключена — напишите нам на hello@northline.studio.";
  contactForm.reset();
});
