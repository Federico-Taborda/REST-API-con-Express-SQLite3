// Iniciando express
const express = require("express");
const app = express();

// Puerto
const port = 3000;

// Root endpoint
app.use("/", (req, res, next) => {
    res.json({"message": "Ok"});
});

// Respuesta para otros endpoints de la API
app.use(() => {
    res.status(404);
});

// Iniciador de servidor
app.listen(port, () => {
    console.log(`Servidor corriendo por el puerto ${port}`);
});


