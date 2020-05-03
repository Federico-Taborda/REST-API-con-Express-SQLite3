# REST API

Simple practica de una REST API con Node, Express y SQLite3. 

La API permite:

|Consulta|Parametros|Endpoint|
|-----------|-----------|-----------|
|Crear usuarios con nombre, email y contraseña|name, email, password|/api/user/|
|Actualizar un usuario|id, name or email or password|/api/user/id|
|Consultar todos los usuarios creados|none|/api/users|
|Consultar usuario por id especifico|id|/api/user/id|
|Eliminar un usuario|id|/api/user/id|