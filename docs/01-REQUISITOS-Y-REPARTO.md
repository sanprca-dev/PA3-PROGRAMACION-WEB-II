# Requisitos y reparto de PA3

## Lo que se evalúa

Fuente principal: PA3_30690_PROGRAMACION_WEB_II.pdf, páginas 2 a 4. La PA3 cambia el foco a React. El backend de PA2 es un antecedente del caso y de sus campos; no hay que rehacerlo ni conectarlo para cumplir esta etapa.

| Actividad | Evidencia esperada | Responsable principal y apoyo |
|---|---|---|
| 1. SPA, JSX, componentes, useState/useEffect | Listado reactivo, búsqueda, formulario y efecto observable | Santiago; Paola añade formulario |
| 2. React Router | Vistas, enlaces, parámetros, regreso y URL inexistente | Paola; Santiago entrega la estructura inicial |
| 3. Context API | Provider y varios consumidores; un cambio se refleja entre vistas | Santiago crea Context; Paola demuestra escritura desde formulario/detalle |
| 4. Redux y comparación | Favoritos y contador desde el mismo store, más comparación basada en ese flujo | Mariano |

El enunciado permite datos locales/simulados y deja Axios y autenticación React fuera del corte evaluable. No añadir login, JWT, despliegue cloud, base de datos nueva, React Query ni otra arquitectura para esta entrega. Redux básico sí es obligatorio; explicarlo sin implementarlo no cubre la actividad 4.

## Qué aportan las cuatro clases

| Clase | Contenido localizado | Decisión |
|---|---|---|
| 06/10 | MongoDB/Mongoose, config, modelos, controladores y rutas; CORS/Helmet | Conservar el backend y los campos del caso PA2 como referencia |
| 13/10 | Hash de contraseñas, JWT y ejemplos de registro/login; revisión de equipos | No trasladar automáticamente esos temas al frontend: el PDF PA3 los excluye de esta etapa |
| 20/10 | Express con productos simulados, CRUD y token; consulta sobre equipos | Usar datos ficticios sin requerir conexión a base, conforme al examen |
| 27/10 | React, Vite, JSX, componentes padre/hijo, props y contador con useState | Estructura pequeña, JavaScript con JSX, imports y componentes funcionales |

En la transcripción del 27/10, alrededor de líneas 65–156 se configura Vite/paquetes; 240–340 tratan root y main.jsx; 400–540, props y contador; 650–660 resumen la clase. No se encontró desarrollo explícito de Router, Context, Redux o useEffect en estas cuatro transcripciones. Se enseñan en las guías porque el examen los exige, apoyándose en documentación oficial. No afirmar en el video que el docente mostró código que no aparece en los insumos.

Las transcripciones tienen errores de reconocimiento: React DOM monta componentes en el DOM, no es una terminal; JSX no es por sí solo un archivo HTML servido directamente. La guía usa los conceptos correctos conservando la sencillez de clase.

## Tamaño del equipo y puntajes

El PDF dice cuatro integrantes, máximo cinco. Sin embargo, en la clase del 27/10, alrededor de líneas 664–677, el docente se dirige al grupo de Santiago, Paola y Mariano y les permite presentar siendo tres si no se incorpora otra persona. Este reparto sigue esa indicación concreta y los integrantes confirmados por Santiago. No hace falta detener el trabajo por el mínimo genérico del PDF.

Las actividades suman 12 puntos en el texto (3 cada una), pero la rúbrica final distribuye 3 + 3 + 2 + 2 técnicos, más 4 GitHub/README, 3 video y 3 seguimiento: 20. Se cubren las cuatro actividades sin inventar una ponderación corregida. El seguimiento de asistencia es individual y no se sustituye por capturas del programa.

## Reparto por entregas de esfuerzo similar

Tiempo orientativo para aprender, implementar y probar: 4–6 horas por persona, según experiencia y entorno. No equivale a una promesa de tiempo ni se reparte solo contando archivos.

**Santiago:** configuración y estructura, datos locales del caso, Context con dos acciones, listado por componentes, búsqueda, resumen y useEffect. Entrega base compilable con contrato estable y pantallas provisionales explícitas. Además, pruebas de su parte y PR propio.

**Paola:** formulario controlado con validación, detalle por parámetro, cambio de estado, errores de navegación y prueba de actualización global. Revisa BrowserRouter/Routes/Link/useNavigate/useParams y demuestra navegación completa. Además, pruebas de su parte y PR propio.

**Mariano:** slice y store de favoritos, Provider Redux, selectores y dispatch, página de favoritos con botones, contador compartido en menú, comparación Context/Redux y pruebas. Además, evidencias y PR propio. No se le asigna toda la documentación del equipo.

## Orden y archivos compartidos

1. Santiago integra primero la base y comunica el commit que deben usar. Las pantallas provisionales no son tareas terminadas de otros integrantes.
2. Paola y Mariano parten del mismo main y avanzan en paralelo.
3. Paola reemplaza pages/NuevaSolicitud.jsx y pages/DetalleSolicitud.jsx; ajusta App/NoEncontrado solo si necesita corregir rutas.
4. Mariano crea store y componentes de favoritos; reemplaza pages/Favoritos.jsx, agrega Provider en main.jsx y contador en components/Menu.jsx.
5. No cambiar id, nombres de campos o exports del Context sin acordarlo. Si necesitan estilos, usan archivos propios para evitar conflictos.
6. Se integran ambos PR preservando commits y se prueba todo junto. Cada alumno añade sus enlaces/evidencias al README al integrar su rama actualizada.

Mientras esperan la base, Paola puede preparar mensajes y matriz de validaciones; Mariano puede estudiar el flujo acción → reducer → store → selector y redactar el contraste esperado. No deben crear otra aplicación React independiente.

## Alcance mínimo de entrega

Navegación entre vistas reales; listado y formulario útiles; Context compartido; useState y useEffect explicables; favoritos Redux en dos componentes; comparación; README actualizado; pruebas, PR y video de los tres. No hacen falta edición completa/eliminación de solicitudes en React, paginación, temas, animaciones, librerías visuales ni persistencia localStorage para cubrir este mínimo.
