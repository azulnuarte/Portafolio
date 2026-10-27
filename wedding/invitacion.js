// ===== CUENTA REGRESIVA =====
const weddingDate = new Date("Feb 12, 2027 19:00:00").getTime();
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
    const distance = weddingDate - new Date().getTime();

    if (distance < 0) {
        countdownEl.innerHTML = "¡Hoy es el gran día! 💍";
        clearInterval(countdown);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

const countdown = setInterval(updateCountdown, 1000);
updateCountdown(); // se muestra de inmediato, sin esperar 1 segundo



document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", async function () {
        const text = btn.dataset.valor;

        // Prueba: confirmar que el botón funciona
        if (!text) {
            alert("El botón no tiene un CBU en data-valor.");
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            btn.textContent = "¡Copiado!";
            setTimeout(function () {
                btn.textContent = "Copiar CBU";
            }, 1800);
        } catch (error) {
            alert(
                "El botón funciona, pero el navegador bloqueó la copia. CBU: " + text
            );
        }
    });
});



// ===== FOTOS: aparecen al bajar =====
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    reveals.forEach(function (el) { io.observe(el); });
} else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
}
