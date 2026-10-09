const openButton = document.querySelector("#open-card");
const closeButton = document.querySelector("#close-card");
const letter = document.querySelector("#birthday-letter");
const music = document.querySelector("#birthday-music");

function setLetterOpen(isOpen) {
  letter.classList.toggle("is-open", isOpen);
  letter.inert = !isOpen;
  letter.setAttribute("aria-hidden", String(!isOpen));
  openButton.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) closeButton.focus();
  else openButton.focus();
}

openButton.addEventListener("click", () => setLetterOpen(true));
closeButton.addEventListener("click", () => setLetterOpen(false));

function startBirthdayMusic() {
  music.play().then(() => {
    document.removeEventListener("pointerdown", startBirthdayMusic);
    document.removeEventListener("keydown", startBirthdayMusic);
  }).catch((error) => {
    if (error.name !== "NotAllowedError") {
      console.error("No se pudo reproducir la música de cumpleaños.", error);
    }
  });
}

document.addEventListener("pointerdown", startBirthdayMusic);
document.addEventListener("keydown", startBirthdayMusic);
startBirthdayMusic();

music.addEventListener("error", () => {
  console.error("No se pudo cargar el archivo de música.", music.error);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letter.classList.contains("is-open")) setLetterOpen(false);
});
