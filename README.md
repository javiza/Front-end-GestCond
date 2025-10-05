
# Front-end-GESTAD
front para proyecto de titulo los siguientes endpoint:
endpoint:

- 1 Usuarios
Método	Ruta	Descripción	Guard / Rol
POST	/usuarios	Crear usuario	JWT + Roles('administrador')
GET	/usuarios	Listar usuarios	JWT
GET	/usuarios/:id	Obtener usuario por ID	JWT
PUT	/usuarios/:id	Actualizar usuario	JWT + Roles('administrador')
DELETE	/usuarios/:id	Borrar usuario (baja lógica)	JWT + Roles('administrador')

