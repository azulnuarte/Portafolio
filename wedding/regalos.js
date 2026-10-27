const REGALOS_URL = "https://script.google.com/macros/s/AKfycbyEiL2EkcfrxsXCmEYy8J1kw3iB0h5-ghWE154-wMhYiE4mNeZinkbW-5nxPKK95uXF/exec";

const contRegalos = document.getElementById("regalos-lista");
const estadoRegalos = document.getElementById("regalos-estado");

// pide datos al script, con un máximo de espera de 20 segundos
function pedir(url) {
    const control = new AbortController();
    const timer = setTimeout(function () { control.abort(); }, 20000);
    return fetch(url, { signal: control.signal }).then(function (r) {
        clearTimeout(timer);
        return r.json();
    });
}

function cargarRegalos() {
    pedir(REGALOS_URL + "?accion=listar")
        .then(function (data) { pintarRegalos(data.regalos); })
        .catch(function (err) {
            console.error(err);
            contRegalos.textContent = "No se pudo cargar la lista. Probá de nuevo en un rato.";
        });
}

function pintarRegalos(regalos) {
    contRegalos.innerHTML = "";
    const categorias = regalos
        .map(function (r) { return r.categoria; })
        .filter(function (c, i, arr) { return arr.indexOf(c) === i; });

    categorias.forEach(function (cat) {
        const grupo = document.createElement("div");
        grupo.className = "regalo-grupo";

        const titulo = document.createElement("h3");
        titulo.textContent = cat;
        grupo.appendChild(titulo);

        regalos.filter(function (r) { return r.categoria === cat; }).forEach(function (r) {
            const fila = document.createElement("div");
            const reservado = String(r.estado).toLowerCase() === "reservado";
            fila.className = "regalo" + (reservado ? " reservado" : "");

            const nombre = document.createElement("span");
            nombre.textContent = r.regalo;

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "copy-btn";
            if (reservado) {
                btn.textContent = "Reservado";
                btn.disabled = true;
            } else {
                btn.textContent = "Reservar";
                btn.addEventListener("click", function () { reservar(r); });
            }

            fila.appendChild(nombre);
            fila.appendChild(btn);
            grupo.appendChild(fila);
        });

        contRegalos.appendChild(grupo);
    });
}

function reservar(r) {
    const nombre = prompt('¿A nombre de quién reservamos "' + r.regalo + '"?');
    if (!nombre || !nombre.trim()) return;

    estadoRegalos.textContent = "Reservando...";
    pedir(REGALOS_URL + "?accion=reservar&id=" + encodeURIComponent(r.id) +
          "&nombre=" + encodeURIComponent(nombre.trim()))
        .then(function (data) {
            if (data.ok) {
                estadoRegalos.textContent = "¡Listo, " + nombre.trim() + "! Reservaste: " + r.regalo + " 🎁";
            } else if (data.error === "ocupado") {
                estadoRegalos.textContent = "Ese regalo ya lo reservó otra persona. Elegí otro, ¡gracias!";
            } else {
                estadoRegalos.textContent = "No se pudo reservar. Probá de nuevo.";
            }
            cargarRegalos();
        })
        .catch(function (err) {
            console.error(err);
            estadoRegalos.textContent = "No se pudo reservar. Revisá tu conexión.";
        });
}

cargarRegalos();