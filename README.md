
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

- 2 Unidades Clínicas
Método	Ruta	Descripción	Guard / Rol
GET	/unidades-clinicas	Listar unidades clínicas	Ninguno
GET	/unidades-clinicas/:id	Obtener unidad clínica por ID	Ninguno
POST	/unidades-clinicas	Crear unidad clínica	Ninguno
PUT	/unidades-clinicas/:id	Actualizar unidad clínica	Ninguno
DELETE	/unidades-clinicas/:id	Eliminar unidad clínica	Ninguno
- 3 Reparaciones
Método	Ruta	Descripción	Guard / Rol
POST	/reparaciones	Crear reparación	JWT + Roles('administrador')
GET	/reparaciones	Listar reparaciones (filtros opcionales: prendaId, desde, hasta, page, limit, export)	JWT + Roles
GET	/reparaciones/:id	Obtener reparación por ID	JWT + Roles
DELETE	/reparaciones/:id	Eliminar reparación	JWT + Roles('administrador')

- 4 Prendas
Método	Ruta	Descripción	Guard / Rol
GET	/prendas	Listar prendas	JWT
GET	/prendas/:id	Obtener prenda por ID	JWT
POST	/prendas	Crear prenda	JWT
PUT	/prendas/:id	Actualizar prenda	JWT
DELETE	/prendas/:id	Eliminar prenda	JWT

- 5 Movimientos
Método	Ruta	Descripción	Guard / Rol
GET	/movimientos	Listar movimientos	JWT
GET	/movimientos/:id	Obtener movimiento por ID	JWT
POST	/movimientos	Crear movimiento	JWT
DELETE	/movimientos/:id	Eliminar movimiento	JWT

- 6 Lavandería
Método	Ruta	Descripción	Guard / Rol
POST	/lavanderia	Ingresar prenda a lavandería	JWT + Roles('administrador')
PATCH	/lavanderia/:id	Actualizar estado de lavado	JWT + Roles('administrador')
GET	/lavanderia	Listar lavados (filtros opcionales: estado, prendaId, desde, hasta)	JWT
GET	/lavanderia/:id	Obtener lavado por ID	JWT

- 7 Inventario
Método	Ruta	Descripción	Guard / Rol
GET	/inventario/:id_prenda	Obtener stock de prenda específica	JWT
GET	/inventario	Listar inventario con filtros (min, max, prendaId, page, limit)	JWT

- 8 Bajas
Método	Ruta	Descripción	Guard / Rol
POST	/bajas	Crear baja de prenda	JWT + Roles('administrador')
GET	/bajas	Listar bajas con filtros (prendaId, motivo, desde, hasta)	JWT
GET	/bajas/:id	Obtener baja por ID	JWT
DELETE	/bajas/:id	Eliminar baja	JWT + Roles('administrador')
