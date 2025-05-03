const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/pransu', (req, res) => {
  const userMessage = req.body.message?.toLowerCase() || "";

  let response = "No entendí tu mensaje. Por favor responde con:\n\n1. Ver catálogo\n2. Hablar con asesor\n3. Ubicación";

  if (userMessage.includes("1") || userMessage.includes("catálogo")) {
    response = "Aquí tienes nuestro catálogo: https://tu-catalogo.com";
  } else if (userMessage.includes("2") || userMessage.includes("asesor")) {
    response = "Un asesor se pondrá en contacto contigo muy pronto.";
  } else if (userMessage.includes("3") || userMessage.includes("ubicación")) {
    response = "Nuestra ubicación es: https://maps.google.com/tu-negocio";
  }

  res.json({
    data: [
      {
        message: response
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});