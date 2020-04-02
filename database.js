// Conectado a la base de datos
let sqlite3 = require("sqlite3").verbose();
let md5 = require("md5");

// Creando la base de datos en caso que no exista, de lo contrario crea una tabla
const DBSOURCE = "db.sqlite";
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message);
    }else{
        console.log('Conectado a la base de datos');

        let sql = `CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, email text UNIQUE, password text, CONSTRAINT email_unique UNIQUE (email))`
        db.run(sql, (err) => {
            if(err) {
                console.log("La tabla ya existe");
            }else{
                let insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
                db.run(insert, ["user", "user@example.com", md5("user123456")]);
            };
        });
    };
});

module.exports = db;

/* Descripcion */
/* El modifador verbose() es para obtener informacion extra para debugging. */
/* MD5 es usado para crear un hash para passwords almacenadas */
/* Se define el archivo de la base de datos SQLite con DBSOURCE. */
/* Se incializa la base de datos como db. Por defecto, se crea un archivo de base de datos vacia, si no existe. */