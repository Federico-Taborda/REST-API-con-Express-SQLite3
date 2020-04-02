// Conectado a la base de datos
const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");

// Creando la base de datos en caso que no exista, de lo contrario crea una tabla
const DBSOURCE = "db.sqlite";
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err) {
        console.log(err.message);
    }else{
        console.log("Conectado a la base de datos");

        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            password text,
            CONSTRAINT email_unique UNIQUE (email)
        )`, 
        (err) => {
            if(err) {
                console.log("La tabla ya existe");
            }else{
                const insert = `INSERT INTO user (name, email, password)VALUES(?, ?, ?)`;
                db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
                db.run(insert, ["user", "user@example.com", md5("user123456")]);
            };
        });
    };
});

module.exports = db;