// 1) Selecciona todas las cards de proyectos
const cards = document.querySelectorAll(".project-card");

// 2) Crea un observador que detecta cuándo un elemento entra a la pantalla
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Si el card es visible (entra al viewport)
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible"); // activa la animación en CSS
      observer.unobserve(entry.target); // deja de observar para que no recalibre
    }
  });
}, {
  threshold: 0.15 // cuando se vea al menos ~15% del elemento
});

// 3) Observa cada card
cards.forEach((card) => observer.observe(card));
