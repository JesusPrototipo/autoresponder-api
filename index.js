const express = require('express');
const app = express();
app.use(express.json());

const CLAVE_SECRETA = 'MI_CLAVE_SECRETA';

app.post('/api/mensajes', (req, res) => {
  const apiKey = req.header('x-api-key');

  if (apiKey !== CLAVE_SECRETA) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  const { senderMessage, senderName } = req.body;

  let respuesta = "No entendí tu mensaje.";
  if (senderMessage && senderMessage.toLowerCase() === "hi") {
    respuesta = `Hi ${senderName}, how can I help you?`;
  }

  res.json({
    data: [
      { message: respuesta }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
