// ===== CUENTA REGRESIVA =====
const weddingDate = new Date("Feb 12, 2027 10:00:00").getTime();
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

// ===== COPIAR ALIAS =====
document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const text = document.getElementById(btn.dataset.copy).textContent.trim();
        const original = btn.textContent;

        const done = function () {
            btn.textContent = "¡Copiado!";
            setTimeout(function () { btn.textContent = original; }, 1800);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done);
        } else {
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            done();
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
