// ============================================================
// ANIM.JS
// Control de letras sincronizadas + título
// ============================================================

const audio = document.querySelector("audio");
const lyrics = document.querySelector("#lyrics");
const titulo = document.querySelector(".titulo");

// ============================================================
// LETRAS SINCRONIZADAS CON LA CANCIÓN
// ============================================================

const lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },

  { text: "Love.", time: 140 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 }
];

// ============================================================
// CONFIGURACIÓN DE LAS LETRAS
// ============================================================

const LYRIC_DURATION = 6;
const FADE_DURATION = 0.45;

// Guarda la línea que se está mostrando actualmente
let currentLyric = null;

// ============================================================
// MOSTRAR / OCULTAR LETRA
// ============================================================

function showLyric(text) {
  if (currentLyric === text) {
    return;
  }

  currentLyric = text;

  lyrics.textContent = text;
  lyrics.classList.remove("lyrics-visible");

  // Permite que el navegador reinicie la transición
  void lyrics.offsetWidth;

  lyrics.classList.add("lyrics-visible");
}

function hideLyrics() {
  if (!currentLyric && lyrics.textContent === "") {
    return;
  }

  currentLyric = null;
  lyrics.classList.remove("lyrics-visible");
}

// ============================================================
// ACTUALIZAR LETRAS
// ============================================================

function updateLyrics() {
  if (!audio || !lyrics) {
    return;
  }

  const currentTime = audio.currentTime;

  const currentLine = lyricsData.find(
    (line, index) => {
      const nextLine = lyricsData[index + 1];

      const start = line.time;
      const end = nextLine
        ? Math.min(line.time + LYRIC_DURATION, nextLine.time)
        : line.time + LYRIC_DURATION;

      return currentTime >= start && currentTime < end;
    }
  );

  if (currentLine) {
    showLyric(currentLine.text);
  } else {
    hideLyrics();
  }
}

// ============================================================
// SINCRONIZACIÓN
// ============================================================

// En lugar de revisar cada segundo con setInterval,
// usamos el evento nativo del audio.
// Esto permite una sincronización mucho más precisa.
if (audio) {
  audio.addEventListener("timeupdate", updateLyrics);

  audio.addEventListener("seeked", updateLyrics);

  audio.addEventListener("loadedmetadata", updateLyrics);

  audio.addEventListener("ended", hideLyrics);
}

// ============================================================
// TÍTULO PRINCIPAL
// ============================================================

let tituloOculto = false;

function ocultarTitulo() {
  if (!titulo || tituloOculto) {
    return;
  }

  tituloOculto = true;

  titulo.classList.add("titulo-oculto");

  setTimeout(() => {
    titulo.style.display = "none";
  }, 3000);
}

// ============================================================
// OCULTAR TÍTULO
// ============================================================

// El título desaparece aproximadamente cuando termina
// la primera parte de la experiencia.
//
// Se mantiene el tiempo original de 216 segundos,
// pero ahora el control está separado y limpio.

setTimeout(ocultarTitulo, 216000);

// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  if (lyrics) {
    lyrics.textContent = "";
    lyrics.classList.remove("lyrics-visible");
  }

  if (audio) {
    updateLyrics();
  }
});