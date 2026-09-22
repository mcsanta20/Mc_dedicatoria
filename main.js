// ============================================================
// MAIN.JS
// Inicio de la animación + interacción con las flores
// ============================================================

window.onload = () => {

    document.body.classList.remove("container");

    cargarPersonalizacion();

    iniciarInteraccionFlores();
};


// ============================================================
// CARGAR PERSONALIZACIÓN
// ============================================================

// ============================================================
// CARGAR PERSONALIZACIÓN
// ============================================================

function cargarPersonalizacion() {

    const titulo =
        document.querySelector(".titulo");

    if (!titulo) {
        return;
    }

    titulo.innerHTML = `
        <span class="personal-name">
            Para ${paginaConfig.nombre}
        </span>

        <br><br>

        ${paginaConfig.mensajePrincipal}

        <br><br>

        ${paginaConfig.mensajeSecundario}
    `;
}



// ============================================================
// VARIABLES DE LA INTERACCIÓN
// ============================================================

let floresDescubiertas = new Set();


// ============================================================
// INICIAR INTERACCIÓN
// ============================================================

function iniciarInteraccionFlores() {

    const flores = document.querySelectorAll(".flower");

    if (!flores.length) {
        return;
    }

    flores.forEach((flor, index) => {

        flor.addEventListener("click", () => {

            activarFlor(flor);

            mostrarMensaje(index);

            registrarFlorDescubierta(flor, index);

        });

    });
}


// ============================================================
// ACTIVAR FLOR
// ============================================================

function activarFlor(flor) {

    flor.classList.remove("flower-clicked");

    void flor.offsetWidth;

    flor.classList.add("flower-clicked");

    crearPetalos(flor);

    setTimeout(() => {
        flor.classList.remove("flower-clicked");
    }, 1200);
}


// ============================================================
// REGISTRAR FLOR DESCUBIERTA
// ============================================================

function registrarFlorDescubierta(flor, index) {

    if (!floresDescubiertas.has(index)) {

        floresDescubiertas.add(index);

        flor.classList.add("flower-discovered");

    }

    verificarFlores();
}


// ============================================================
// VERIFICAR SI TODAS FUERON DESCUBIERTAS
// ============================================================

function verificarFlores() {

    const flores = document.querySelectorAll(".flower");

    if (floresDescubiertas.size >= flores.length) {

        setTimeout(() => {

            mostrarMensajeFinal();

        }, 1200);
    }
}


// ============================================================
// MENSAJE NORMAL
// ============================================================

function mostrarMensaje(index) {

    let mensaje = document.querySelector(".flower-message");

    if (!mensaje) {

        mensaje = document.createElement("div");

        mensaje.classList.add("flower-message");

        document.body.appendChild(mensaje);
    }

    const texto =
        paginaConfig.mensajesFlores[
            index % paginaConfig.mensajesFlores.length
        ];

    mensaje.classList.remove("flower-message-visible");

    void mensaje.offsetWidth;

    mensaje.textContent = texto;

    mensaje.classList.add("flower-message-visible");

    clearTimeout(mensaje.hideTimer);

    mensaje.hideTimer = setTimeout(() => {

        mensaje.classList.remove("flower-message-visible");

    }, 5000);
}


// ============================================================
// MENSAJE FINAL
// ============================================================

function mostrarMensajeFinal() {

    let mensajeFinal =
        document.querySelector(".flower-final-message");

    if (!mensajeFinal) {

        mensajeFinal = document.createElement("div");

        mensajeFinal.classList.add("flower-final-message");

        mensajeFinal.innerHTML = `
            <span>
                ${paginaConfig.descubrimiento.titulo}
            </span>

            <small>
                ${paginaConfig.descubrimiento.subtitulo}
            </small>

            <div class="continue-hint">
                <span class="continue-arrow">↓</span>
                <span>${paginaConfig.continuar}</span>
            </div>
        `;

        document.body.appendChild(mensajeFinal);
    }

    mensajeFinal.classList.add(
        "flower-final-message-visible"
    );

    document.body.classList.add(
        "all-flowers-discovered"
    );

    prepararSiguientePaso();
}

// ============================================================
// PREPARAR SIGUIENTE PASO
// ============================================================

function prepararSiguientePaso() {

    const mensajeFinal =
        document.querySelector(".flower-final-message");

    if (!mensajeFinal) {
        return;
    }

    mensajeFinal.addEventListener(
        "click",
        avanzarDespuesDelDescubrimiento,
        { once: true }
    );

}

// ============================================================
// CONTINUAR DESPUÉS DEL DESCUBRIMIENTO
// ============================================================

function avanzarDespuesDelDescubrimiento() {

    const mensajeFinal =
        document.querySelector(".flower-final-message");

    if (!mensajeFinal) {
        return;
    }

    mensajeFinal.classList.remove(
        "flower-final-message-visible"
    );

    // Cambiar a la segunda etapa visual
    document.body.classList.add(
        "ready-for-next-step"
    );

    // Ocultar el texto principal
    const titulo =
        document.querySelector(".titulo");

    if (titulo) {
        titulo.classList.add("titulo-second-stage");
    }

    mostrarMensajePersonal();
}

// ============================================================
// MENSAJE PERSONAL
// ============================================================

function mostrarMensajePersonal() {

    let mensajePersonal =
        document.querySelector(".personal-message");

    if (!mensajePersonal) {

        mensajePersonal =
            document.createElement("div");

        mensajePersonal.classList.add(
            "personal-message"
        );

        mensajePersonal.innerHTML = `
            <span class="personal-text">
                ${paginaConfig.mensajePersonal}
            </span>

            <span class="personal-signature">
                ${paginaConfig.firma}
            </span>
        `;

        document.body.appendChild(
            mensajePersonal
        );
    }

    setTimeout(() => {

        mensajePersonal.classList.add(
            "personal-message-visible"
        );

        iniciarTransicionFinal();

    }, 700);

}
// ============================================================
// TRANSICIÓN HACIA LA OSCURIDAD
// ============================================================

function iniciarTransicionFinal() {

    /*
     * Dejamos tiempo para que el mensaje y la firma
     * puedan apreciarse antes de comenzar el cierre.
     */
    setTimeout(() => {

        document.body.classList.add(
            "final-transition"
        );

        iniciarLuzEnLaOscuridad();

    }, 6500);

}
// ============================================================
// CREAR PÉTALOS
// ============================================================

function crearPetalos(flor) {

    const cantidad = 7;

    for (let i = 0; i < cantidad; i++) {

        const petalo = document.createElement("span");

        petalo.classList.add("interactive-petal");

        const angulo =
            Math.random() * Math.PI * 2;

        const distancia =
            25 + Math.random() * 45;

        const x =
            Math.cos(angulo) * distancia;

        const y =
            Math.sin(angulo) * distancia;

        petalo.style.setProperty(
            "--petal-x",
            `${x}px`
        );

        petalo.style.setProperty(
            "--petal-y",
            `${y}px`
        );

        const tamaño =
            3 + Math.random() * 4;

        petalo.style.width =
            `${tamaño}px`;

        petalo.style.height =
            `${tamaño}px`;

        flor.appendChild(petalo);

        setTimeout(() => {
            petalo.remove();
        }, 1200);
    }
}

// ============================================================
// FASE 5.2 / 5.3
// APARICIÓN DE LA LUZ Y CARTA FINAL
// ============================================================

function iniciarLuzEnLaOscuridad() {

    let luz = document.querySelector(".final-light");

    if (!luz) {

        luz = document.createElement("div");

        luz.classList.add("final-light");

        document.body.appendChild(luz);
    }

    setTimeout(() => {

        luz.classList.add("final-light-visible");

    }, 1800);


    // La carta nace desde la luz
    setTimeout(() => {

        mostrarCartaFinal();

    }, 5200);
}

// ============================================================
// CARTA FINAL
// ============================================================

function mostrarCartaFinal() {

    let carta =
        document.querySelector(".final-letter");

    if (!carta) {

        carta = document.createElement("div");

        carta.classList.add("final-letter");

        carta.innerHTML = `

            <div class="letter-glow"></div>

            <div class="letter-content">

                <div class="letter-title">
                    ${paginaConfig.carta.titulo}
                </div>

                <div class="letter-line"></div>

                <div class="letter-text">
                    <p>
                        ${paginaConfig.carta.texto}
                    </p>

                    <p>
                        ${paginaConfig.carta.texto2}
                    </p>
                </div>

                <div class="letter-closing">
                    ${paginaConfig.carta.cierre}
                </div>

                <div class="letter-signature">
                    ${paginaConfig.firma}
                </div>

            </div>
        `;

        document.body.appendChild(carta);
    }

    setTimeout(() => {

        carta.classList.add(
            "final-letter-visible"
        );

        prepararRegresoJardin();

    }, 300);

}
// ============================================================
// FASE 5.4
// REGRESO DEL JARDÍN
// ============================================================

function prepararRegresoJardin() {

    /*
     * Dejamos que la carta permanezca visible
     * antes de comenzar el regreso.
     */
    setTimeout(() => {

        iniciarRegresoJardin();

    }, 8500);

}


// ============================================================
// INICIAR REGRESO DEL JARDÍN
// ============================================================

function iniciarRegresoJardin() {

    const carta =
        document.querySelector(".final-letter");

    const luz =
        document.querySelector(".final-light");

    /*
     * La carta comienza a desaparecer.
     */
    if (carta) {

        carta.classList.add(
            "final-letter-ending"
        );
    }


    /*
     * La luz comienza a expandirse.
     */
    if (luz) {

        luz.classList.add(
            "final-light-expanding"
        );
    }


    /*
     * Un poco después comenzamos
     * a devolver el jardín.
     */
    setTimeout(() => {

        document.body.classList.add(
            "garden-return"
        );

    }, 1400);


    /*
     * Cuando el jardín ya apareció,
     * mostramos el cierre.
     */
    setTimeout(() => {

        mostrarMensajeCierre();

    }, 4200);

}

// ============================================================
// MENSAJE DE CIERRE
// ============================================================

function mostrarMensajeCierre() {

    let cierre =
        document.querySelector(".final-closing-message");

    if (!cierre) {

        cierre =
            document.createElement("div");

        cierre.classList.add(
            "final-closing-message"
        );

        cierre.innerHTML = `

            <span class="closing-main">
                ${paginaConfig.cierre.titulo}
            </span>

            <span class="closing-sub">
                ${paginaConfig.cierre.subtitulo}
            </span>

        `;

        document.body.appendChild(cierre);
    }


    setTimeout(() => {

        cierre.classList.add(
            "final-closing-message-visible"
        );

        prepararCierreFinal();

    }, 300);

}