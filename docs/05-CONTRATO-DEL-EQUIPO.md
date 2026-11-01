# Contrato de componentes y estado

Este documento fija los nombres antes del desarrollo. Es un acuerdo de implementación, no una afirmación de que ya existe la aplicación.

## Datos locales

Solicitud: id (string estable), estudiante, codigo (string de ocho dígitos), correo, tipo, motivo, estado y fecha ISO. Tipos: Constancia de estudios / Cambio de horario / Revisión de nota. Estados: Pendiente / En revisión / Atendida. Se conservan los campos del caso PA2, pero aquí id no es el _id de MongoDB.

Dos datos ficticios iniciales: demo-1 y demo-2. Las nuevas solicitudes reciben crypto.randomUUID(). No hacer requests al backend ni pasar ids del navegador a MongoDB. Al navegar se mantiene estado; al recargar el documento se reinician las solicitudes y favoritos. Esto es intencional y debe explicarse.

## Context de Santiago

Archivo frontend/src/context/SolicitudesContext.jsx. Exports: SolicitudesProvider y useSolicitudes.

`useSolicitudes()` devuelve:

- solicitudes: array de documentos locales.
- agregarSolicitud(datos): recibe estudiante/codigo/correo/tipo/motivo ya validados, añade id/estado Pendiente/fecha y retorna el nuevo id.
- cambiarEstado(id, estado): actualiza inmutablemente el estado si está permitido.

Provider por encima de Routes. Inicio y Solicitudes son lectores; formulario y detalle llaman a las acciones; Favoritos consulta la lista para mostrar los ids elegidos. No agregar otra copia de solicitudes en el estado de cada página.

## Rutas

| Ruta | Pantalla | Responsable de completarla |
|---|---|---|
| / | Inicio y resumen | Santiago |
| /solicitudes | Lista y búsqueda | Santiago |
| /nueva | Formulario | Paola |
| /solicitudes/:id | Detalle y cambio de estado | Paola |
| /favoritos | Marcar/desmarcar y ver selección | Mariano |
| * | Mensaje página no encontrada | Base Santiago; verificación Paola |

Paola diferencia una ruta desconocida de un id no encontrado. Ambas ofrecen retorno con Link. No usar anchor href o window.location para enlaces internos porque recargan y pierden estado en memoria.

## Redux de Mariano

Estado: `{ favoritos: { ids: [] } }`. Store en src/store/store.js; slice en src/store/favoritosSlice.js. Acciones alternarFavorito(id) y vaciarFavoritos(). Solo ids, nunca copias completas del documento. Menu muestra cantidad y Favoritos cambia/lee la selección. No crear una segunda lista Context de favoritos.

Provider de react-redux con store se coloca una vez en main.jsx, por encima de App. Se conserva SolicitudesProvider. Provider Redux y Provider Context pueden coexistir porque comparten datos distintos.

## Validación del formulario

estudiante trim 3–80; codigo exactamente ocho dígitos; correo trim, hasta 120, formato sencillo y minúsculas al guardar; tipo del enum; motivo trim 20–500. Mostrar mensajes y no guardar si falla. Al enviar un registro válido: preventDefault, agregarSolicitud y navegar a /solicitudes/id. No permitir elegir estado o id en el registro inicial.

## Acuerdo de prueba conjunta

Crear desde formulario → ver detalle → volver a lista → ver total en Inicio → cambiar estado desde detalle → ver pendientes actualizados → marcar en Favoritos → verificar contador en menú → navegar sin perder selección → quitar → recargar para mostrar el reinicio intencional. Una URL /solicitudes/no-existe muestra mensaje, no pantalla en blanco.
