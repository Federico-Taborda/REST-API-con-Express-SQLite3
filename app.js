// Iniciando express
const express = require("express");
const app = express();

// Agregamos la conexion a la base de datos
const db = require("./database.js");
const md5 = require("md5");

// Agregando el parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Puerto
const port = 3000;

// Root endpoint
app.get("/", (req, res) => {
    res.json({"message": "Ok"});
});

// Consulta lista de usuarios
app.get("/api/users", (req, res) => {
    let sql = `SELECT * FROM user`;
    let params = [];
    db.all(sql, params, (err, rows) => {
        if(err) res.status(400).json({"error": err.message});
        res.json({"message": "success", "data": rows});
    });
});

// Consulta de usuario por id
app.get("/api/user/:id", (req, res) => {
    let sql = `SELECT * FROM user where id = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if(err) res.status(400).json({"error": err.message});
        res.json({"message": "success", "data": row});
    });
});

// Crea un nuevo usuario
app.post("/api/user/", (req, res) => {
    let errors = [];
    if(!req.body.password) errors.push("Contraseña no especificada");
    if(!req.body.email) errors.push("Email no especificado");
    if(errors.length) res.status(400).json({"error": errors.join(", ")});
    
    let data = {name: req.body.name, email: req.body.email, password: md5(req.body.password)};
    let sql = `INSERT INTO user (name, email, password)VALUES(?,?,?)`;
    let params = [data.name, data.email, data.password];
    db.run(sql, params,(err, result) => {
        if(err) res.status(400).json({"error": err.message});
        res.json({"message": "success", "data": data, "id": this.lastID});
    });
});

// Actualizar un usuario
app.patch("/api/user/:id", (req, res) => {
    let data = {name: req.body.name, email: req.body.email, password: req.body.password ? md5(req.body.password) : null};
    let sql = `UPDATE user set name = COALESCE(?,name), email = COALESCE(?,email), password = COALESCE(?,password) WHERE id = ?`;
    let params = [data.name, data.email, data.password, req.params.id];
    db.run(sql, params, (err) => {
       if(err) res.status(400).json({"error": err.message});
       res.json({"message": "success", "data": data, "changes": this.changes});
    });
});

// Respuesta para otros endpoints de la API
app.use(() => {
    res.status(404);
});

// Iniciador de servidor
app.listen(port, () => {
    console.log(`Servidor corriendo por el puerto ${port}`);
});


