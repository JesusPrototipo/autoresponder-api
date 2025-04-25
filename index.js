const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/mensajes', (req, res) => {
  const { senderMessage, senderName } = req.body;

  let respuesta = "No entendí tu mensaje.";
  if (senderMessage.toLowerCase() === "hi") {
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