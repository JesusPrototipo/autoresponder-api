const express = require('express');
const app = express();
app.use(express.json());

// Puedes cambiar esto por una clave secreta si la configuras en la app
const API_KEY = 'MI_CLAVE_SECRETA';

app.post('/api/pransu', (req, res) => {
  const headerKey = req.headers['x-api-key']; // asegúrate de usar este nombre si PransuInc lo permite

  if (headerKey && headerKey !== API_KEY) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  const { senderMessage } = req.body;

  if (!senderMessage) {
    return res.json({
      data: [
        { message: "No recibí ningún mensaje." }
      ]
    });
  }

  const mensaje = senderMessage.toLowerCase();

  if (mensaje === 'hola' || mensaje === 'hi') {
    return res.json({
      data: [
        {
          message: "Hola, ¿qué deseas hacer?",
          buttons: ["Ver catálogo", "Soporte", "Ubicación"]
        }
      ]
    });
  }

  return res.json({
    data: [
      { message: "Lo siento, no entendí tu mensaje. Escribe 'hola' para comenzar." }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));