const keys = document.querySelectorAll(".keyboard li");

function getRandomNumber(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}

function targetRandomKey() {
  const key = getRandomKey();
  key.classList.add("selected");
}

document.addEventListener("keydown", (e) => {
  const keyPressed = e.key.toUpperCase();
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");
  
  // Validar que el elemento existe
  if (!keyElement) {
    console.warn(`Tecla no encontrada: ${keyPressed}`);
    return;
  }
  
  keyElement.classList.add("hit");

  keyElement.addEventListener("animationend", () => {
    keyElement.classList.remove("hit");
  });

  // Validar que hay una tecla resaltada
  if (highlightedKey && keyPressed === highlightedKey.innerHTML) {
    highlightedKey.classList.remove("selected");
    
    // Remover clase selected de teclas especiales
    const specialKeys = ["CAPSLOCK", "BACKSPACE", "TAB", "ENTER", "SHIFT"];
    if (specialKeys.includes(keyPressed)) {
      keyElement.classList.remove("selected");
    }
    
    targetRandomKey();
  }
});

targetRandomKey();
