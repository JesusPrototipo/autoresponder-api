const express = require('express');
const app = express();
app.use(express.json());

const CLAVE_SECRETA = 'MI_CLAVE_SECRETA';

app.post('/api/mensajes', (req, res) => {
  const apiKey = req.header('x-api-key');

  if (apiKey !== CLAVE_SECRETA) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  const { senderMessage } = req.body;

  if (senderMessage && senderMessage.toLowerCase() === "hi") {
    return res.json({
      data: [
        {
          message: "Hola 👋 ¿En qué te puedo ayudar?",
          buttons: [
            {
              title: "Ver productos",
              payload: "ver_productos"
            },
            {
              title: "Hablar con soporte",
              payload: "hablar_soporte"
            },
            {
              title: "Ubicación",
              payload: "ubicacion"
            }
          ]
        }
      ]
    });
  }

  res.json({
    data: [
      { message: "No entendí tu mensaje." }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
