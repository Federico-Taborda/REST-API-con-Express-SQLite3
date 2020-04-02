// Iniciando express
const express = require("express");
const app = express();

// Agregamos la conexion a la base de datos
const db = require("./database");

// Puerto
const port = 3000;

// Root endpoint
app.use("/", (req, res) => {
    res.json({"message": "Ok"});
});

// Consulta lista de usuarios
app.get("/api/users", (req, res) => {
    let sql = `SELECT * FROM user`;
    let params = [];
    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        };

        console.log(rows)
        res.json({"message": "succes", "data": rows});
    });
});

// Respuesta para otros endpoints de la API
/* app.use(() => {
    res.status(404);
}); */

// Iniciador de servidor
app.listen(port, () => {
    console.log(`Servidor corriendo por el puerto ${port}`);
});


