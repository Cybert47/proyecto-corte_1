//  Punto de entrada de la aplicación
import { App } from '././app.js';

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});

