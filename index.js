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

  // Si el usuario envía "hi", se responde con el video
  if (senderMessage && senderMessage.toLowerCase() === "hi") {
    return res.json({
      data: [
        {
          video: "https://streamable.com/160u1w"
        }
      ]
    });
  }

  // Respuesta por defecto si el mensaje no es "hi"
  res.json({
    data: [
      { message: "No entendí tu mensaje." }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));

