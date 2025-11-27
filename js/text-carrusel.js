
document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    '“Real estate is more than an investment — it’s the backdrop of your best moments.”',
    '“Every home has a story. My job is to help you find the one that transforms your life.”',
    '“From dream to doorstep, I’m with you every step of the way.”'
  ];

  const quoteElement = document.getElementById("story-quote");
  let index = 0;
  const changeDelay = 5000; // Tiempo entre frases (ms)

  const showNextQuote = () => {
    // Deslizar hacia la izquierda (salida)
    quoteElement.classList.remove("active");
    quoteElement.classList.add("slide-out");

    setTimeout(() => {
      // Cambiar texto y prepararlo para entrar
      index = (index + 1) % quotes.length;
      quoteElement.textContent = quotes[index];
      quoteElement.classList.remove("slide-out");
      quoteElement.classList.add("slide-in");

      // Mostrarlo deslizándose hacia adentro
      setTimeout(() => {
        quoteElement.classList.remove("slide-in");
        quoteElement.classList.add("active");
      }, 100);
    }, 800); // tiempo del deslizamiento de salida
  };

  // Inicia el carrusel
  quoteElement.classList.add("active");
  setInterval(showNextQuote, changeDelay);
});

