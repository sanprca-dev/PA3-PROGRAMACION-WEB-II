# PA3 - Plataforma de Gestión de Solicitudes Académicas

**Curso:** Programación Web II · Código 30690 · NRC 4060
**Repositorio:** [PA3-PROGRAMACION-WEB-II](https://github.com/sanprca-dev/PA3-PROGRAMACION-WEB-II)
**Video Youtube:** https://www.youtube.com/watch?v=H3W8qkh2JUk

## Descripción y objetivo

SPA en React para consultar, registrar y organizar solicitudes académicas con componentes JSX, Hooks, React Router, Context API y Redux. Utiliza datos ficticios locales, conforme al alcance de PA3; no consume APIs ni implementa autenticación.

## Estado actual y participación

La base de Santiago y los favoritos de Mariano están integrados en main. La ampliación de formulario, detalle y cambio de estado se completó en la rama `santiago-completar-formulario-detalle`, después de actualizar con el merge de Mariano. La aplicación integrada compila y pasó las comprobaciones locales descritas abajo. Revisión de la ampliación: [PR #3](https://github.com/sanprca-dev/PA3-PROGRAMACION-WEB-II/pull/3).

| Integrante | Participación registrada | Seguimiento |
|---|---|---|
| Santiago Prado Carrasco | Base React/Vite, listado, búsqueda, useEffect y Context; ampliación final de formulario, detalle y pruebas de integración | [PR #1](https://github.com/sanprca-dev/PA3-PROGRAMACION-WEB-II/pull/1) · [Evidencias](evidencias/santiago/) |
| Mariano Valderrama Shuña | Favoritos Redux, contador del menú, comparación Context/Redux y evidencias | [PR #2](https://github.com/sanprca-dev/PA3-PROGRAMACION-WEB-II/pull/2) · [Evidencias](evidencias/mariano/) |
| Paola Gutiérrez Afata | Tenía asignados formulario y detalle; no se recibió aporte ni video al cierre de esta actualización | Sin aporte registrado para PA3 |

La ampliación final no se atribuye a Paola. La participación individual y los requisitos de video se informan por separado del funcionamiento técnico.

## Solución implementada

- React y Vite organizan la interfaz en componentes funcionales con JSX.
- Context conserva las solicitudes y expone agregarSolicitud y cambiarEstado. Inicio, listado, formulario, detalle y favoritos comparten esta información.
- useState controla la búsqueda y el formulario; useEffect sincroniza el título de Inicio con el total de solicitudes y restaura el título al salir.
- React Router permite navegar sin recargar el documento, consultar un id y mostrar mensajes para rutas o solicitudes inexistentes.
- Redux almacena únicamente los ids favoritos; la página Favoritos y el contador del menú consumen el mismo store. Los documentos permanecen en Context.
- El formulario valida nombre, código de ocho dígitos, correo, tipo permitido y motivo de 20 a 500 caracteres. Un registro válido navega a su detalle.
- El detalle permite cambiar entre Pendiente, En revisión y Atendida; el cambio se refleja en las otras vistas.

Los datos permanecen durante la navegación y se reinician al recargar el navegador. No se ofrece persistencia MongoDB ni localStorage en el frontend de esta evaluación.

## Ejecución local

Entorno: Node 24 y npm. Las dependencias concretas están fijadas en frontend/package-lock.json: React, React Router, Redux Toolkit, React Redux y Vite.

Desde la raíz del repositorio:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Si Vite ya está ejecutándose, detén ese servidor con Ctrl+C antes de reinstalar dependencias. Abre la URL que muestra Vite, normalmente http://localhost:5173. No abras index.html por doble clic.

Para compilar, desde frontend:

```powershell
npm.cmd run build
```

No es necesario iniciar MongoDB ni el backend. `backend/` conserva el código de [PA2, commit 4e8d3b2](https://github.com/sanprca-dev/PA2-PROGRAMACION-WEB-II/tree/4e8d3b25cc6d68eb4768a00edd2ffd2fa5340bbd) como referencia, sin cambios en esta ampliación.

## Vistas y archivos principales

| Ruta | Función | Archivo |
|---|---|---|
| / | Resumen de total y pendientes | [Inicio.jsx](frontend/src/pages/Inicio.jsx) |
| /solicitudes | Listado y búsqueda | [Solicitudes.jsx](frontend/src/pages/Solicitudes.jsx) |
| /nueva | Registro validado | [NuevaSolicitud.jsx](frontend/src/pages/NuevaSolicitud.jsx) |
| /solicitudes/:id | Detalle y cambio de estado | [DetalleSolicitud.jsx](frontend/src/pages/DetalleSolicitud.jsx) |
| /favoritos | Selección, consulta y vaciado de favoritos | [Favoritos.jsx](frontend/src/pages/Favoritos.jsx) |
| Cualquier otra ruta | Mensaje y retorno al inicio | [NoEncontrado.jsx](frontend/src/pages/NoEncontrado.jsx) |

[Context de solicitudes](frontend/src/context/SolicitudesContext.jsx) · [Store Redux](frontend/src/store/store.js) · [Slice de favoritos](frontend/src/store/favoritosSlice.js) · [Rutas](frontend/src/App.jsx).

## Evidencias y verificación local

Se conservan las capturas originales de [Santiago](evidencias/santiago/) y [Mariano](evidencias/mariano/). Las capturas siguientes se generaron durante una comprobación automatizada en navegador de la integración local; no constituyen evidencia de participación de Paola:

| Captura | Resultado |
|---|---|
| [Formulario inválido](evidencias/santiago/integracion/01-formulario-validacion.png) | El envío vacío muestra un mensaje y no crea un registro |
| [Solicitud creada](evidencias/santiago/integracion/02-solicitud-creada-detalle.png) | Registro válido navega al detalle y conserva ceros iniciales del código |
| [Resumen actualizado](evidencias/santiago/integracion/03-context-resumen-actualizado.png) | Context refleja el nuevo total y el cambio de estado |
| [Favoritos integrados](evidencias/santiago/integracion/04-redux-solicitud-nueva.png) | La nueva solicitud puede marcarse y verse con su estado actualizado |

También se comprobó: búsqueda, título de la pestaña, conservación de favoritos al navegar, vaciado, reinicio de datos con F5 y mensajes de ruta/id inexistentes. La compilación terminó correctamente y no hubo errores de ejecución capturados por el navegador durante este recorrido. Esta comprobación no implica que exista una suite instalada mediante npm test.

Para repetir manualmente: crea una solicitud, cambia su estado a Atendida, vuelve a Inicio, verifica el total y pendientes, márcala en Favoritos, navega y regresa, vacía la selección y recarga para comprobar el reinicio.

## Comparación y documentación

La [comparación de Context y Redux](docs/COMPARACION-CONTEXT-REDUX.md) explica las decisiones del flujo implementado. Context permite compartir los documentos con una configuración pequeña; Redux hace explícitas las acciones de selección. No es necesario duplicar la lista en ambos mecanismos.

Se mantienen las [guías y documentos de planificación](docs/) como referencia del procedimiento original. La participación actual es la indicada en este README.

## Conclusiones

La aplicación reúne las cuatro áreas técnicas de PA3: componentes y Hooks, navegación, Context y un flujo básico de Redux. La creación y los cambios de estado se reflejan entre vistas, y los favoritos conservan la referencia al mismo documento. La separación entre datos compartidos y estado local permite explicar por qué cada dato se guarda en un lugar distinto.

## Video de exposición

**Video público de YouTube:** [(https://www.youtube.com/watch?v=H3W8qkh2JUk)]

Santiago informa que su video está grabado; el enlace público todavía no está disponible. No se dispone de video ni participación de Paola al cierre de esta actualización. La publicación y revisión del video quedan pendientes; no se presenta ese requisito como cumplido.

**Última actualización:** 03/11/2026
