# Santiago: primera entrega que desbloquea al equipo

## Resultado de tu etapa

Crearás `frontend/` con React y Vite, datos simulados, un listado con búsqueda, un resumen y un Context que ambas vistas consumen. Dejarás rutas y pantallas provisionales para que Paola y Mariano puedan trabajar por separado. Los ejemplos siguientes son una guía para implementar: el frontend no está creado en el repositorio inicial.

El backend de PA2 se conserva como antecedente; no necesitas iniciarlo, instalar sus dependencias ni abrir MongoDB para esta PA3. No uses Axios ni fetch. El examen pide datos locales.

## 1. Abrir PA3 y preparar tu rama

Abre en VS Code `C:\Users\sa_pr\PA3-PROGRAMACION-WEB-II`. Si trabajas en otro equipo, clona primero el repositorio PA3. No clones de nuevo sobre una carpeta existente.

```powershell
Set-Location 'C:\Users\sa_pr\PA3-PROGRAMACION-WEB-II'
git status
git remote -v
git config user.name
git config user.email
node --version
npm.cmd --version
git switch main
git pull --ff-only origin main
git switch -c santiago-base-react
```

Tu remoto debe terminar en PA3-PROGRAMACION-WEB-II. Node 24 es el entorno disponible y coincide con el criterio LTS explicado en clase. Si git status muestra trabajo pendiente, guárdalo antes de cambiar de rama. Cada alumno usa su propio correo verificado en GitHub.

## 2. Crear el proyecto como en la clase del 27/10

```powershell
mkdir frontend
cd frontend
npm.cmd init -y
npm.cmd pkg set type=module
npm.cmd pkg set scripts.dev="vite" scripts.build="vite build" scripts.preview="vite preview"
npm.cmd install react@19.2.0 react-dom@19.2.0 react-router@7
npm.cmd install --save-dev vite@7.3.1 @vitejs/plugin-react@5
mkdir src
mkdir src/components
mkdir src/pages
mkdir src/data
mkdir src/context
```

React y React DOM 19.2.0 y Vite 7.3.1 se reconocen en la transcripción. La versión menor del plugin no se oye con claridad: usamos la rama 5, sin atribuir al profesor un número incierto. React Router 7 se añade por el examen; usaremos su modo declarativo con imports desde `react-router`. No mezcles estos ejemplos con tutoriales de otras versiones.

`type=module` permite import/export. Vite compila JSX y sirve el frontend; React DOM monta la interfaz en el navegador. Los paquetes quedan fijados en el package-lock que genere tu instalación. Mariano instalará Redux en su etapa; tú no lo necesitas todavía.

## 3. Escribir los archivos por bloques

Las rutas de los títulos siguientes son relativas a `frontend/`. Crea cada archivo en VS Code. No pegues varios archivos en uno ni incluyas las marcas de bloque de Markdown. Guarda todo antes de ejecutar. El primer arranque completo corresponde al paso 4.

### index.html

Este es el único HTML de entrada. root es el contenedor donde React montará los componentes.

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Solicitudes PA3</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>
```

### vite.config.js

El plugin permite transformar JSX. No es un servidor Express.

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });
```

### src/data/solicitudesIniciales.js

Conservamos los campos y opciones del caso PA2, con datos ficticios. id es un string local, no un ObjectId de MongoDB. No copies datos personales de la base real.

```js
export const TIPOS = ['Constancia de estudios', 'Cambio de horario', 'Revisión de nota'];
export const ESTADOS = ['Pendiente', 'En revisión', 'Atendida'];
export const solicitudesIniciales = [
  { id: 'demo-1', estudiante: 'Ana de prueba', codigo: '20260001', correo: 'ana@example.com', tipo: TIPOS[0], motivo: 'Necesito una constancia para mis prácticas.', estado: 'Pendiente', fecha: '2026-11-01T12:00:00.000Z' },
  { id: 'demo-2', estudiante: 'Luis de prueba', codigo: '20260002', correo: 'luis@example.com', tipo: TIPOS[1], motivo: 'Solicito cambiar el horario por motivos de trabajo.', estado: 'En revisión', fecha: '2026-11-01T13:00:00.000Z' }
];
```

### src/context/SolicitudesContext.jsx

Aquí vive el estado compartido. useState almacena la lista, el Provider entrega datos y acciones, y useContext los consume. agregarSolicitud recibe datos ya validados por el formulario de Paola. Retorna el id nuevo para navegar al detalle. Las funciones actualizan sin mutar el array original. crypto.randomUUID funciona en localhost. La validación del navegador de esta práctica no sustituye la del servidor de PA2.

```jsx
import { createContext, useContext, useState } from 'react';
import { solicitudesIniciales, ESTADOS } from '../data/solicitudesIniciales';

const SolicitudesContext = createContext(null);

export function SolicitudesProvider({ children }) {
  const [solicitudes, setSolicitudes] = useState(solicitudesIniciales);

  function agregarSolicitud(datos) {
    const nueva = {
      estudiante: datos.estudiante.trim(), codigo: datos.codigo.trim(),
      correo: datos.correo.trim().toLowerCase(), tipo: datos.tipo,
      motivo: datos.motivo.trim(), id: crypto.randomUUID(),
      estado: 'Pendiente', fecha: new Date().toISOString()
    };
    setSolicitudes(actuales => [...actuales, nueva]);
    return nueva.id;
  }

  function cambiarEstado(id, estado) {
    if (!ESTADOS.includes(estado)) return;
    setSolicitudes(actuales => actuales.map(s => s.id === id ? { ...s, estado } : s));
  }

  return <SolicitudesContext.Provider value={{ solicitudes, agregarSolicitud, cambiarEstado }}>
    {children}
  </SolicitudesContext.Provider>;
}

export function useSolicitudes() {
  const contexto = useContext(SolicitudesContext);
  if (!contexto) throw new Error('Falta SolicitudesProvider');
  return contexto;
}
```

### src/components/Menu.jsx

NavLink cambia la ruta sin recargar el documento y permite destacar la opción activa. No uses window.location para los enlaces internos.

```jsx
import { NavLink } from 'react-router';
export default function Menu() {
  return <nav aria-label="Navegación principal">
    <NavLink to="/" end>Inicio</NavLink>
    <NavLink to="/solicitudes">Solicitudes</NavLink>
    <NavLink to="/nueva">Nueva solicitud</NavLink>
    <NavLink to="/favoritos">Favoritos</NavLink>
  </nav>;
}
```

### src/components/TarjetaSolicitud.jsx

Como App y Saludo en clase: un padre pasa datos por props. key se coloca en la lista, con un id estable.

```jsx
import { Link } from 'react-router';
export default function TarjetaSolicitud({ solicitud }) {
  return <article>
    <h2>{solicitud.estudiante}</h2>
    <p>{solicitud.tipo} · {solicitud.estado}</p>
    <Link to={`/solicitudes/${solicitud.id}`}>Ver detalle</Link>
  </article>;
}
```

### src/pages/Inicio.jsx

useEffect sincroniza el título del navegador con el total y devuelve una limpieza al salir. El total y los pendientes se calculan desde la lista; no creamos otro estado que pueda quedar desactualizado. En StrictMode puede repetirse la preparación y limpieza durante desarrollo: no indica un registro duplicado.

```jsx
import { useEffect } from 'react';
import { useSolicitudes } from '../context/SolicitudesContext';
export default function Inicio() {
  const { solicitudes } = useSolicitudes();
  const pendientes = solicitudes.filter(s => s.estado === 'Pendiente').length;
  useEffect(() => {
    const tituloAnterior = document.title;
    document.title = `Solicitudes PA3 (${solicitudes.length})`;
    return () => { document.title = tituloAnterior; };
  }, [solicitudes.length]);
  return <section><h1>Solicitudes académicas</h1>
    <p>Total: {solicitudes.length}</p><p>Pendientes: {pendientes}</p>
    <p>Demostración con datos locales. Al recargar se reinicia la información.</p>
  </section>;
}
```

### src/pages/Solicitudes.jsx

La búsqueda es estado local porque solo pertenece a esta pantalla. La lista es global porque también la usan Inicio, el detalle y Favoritos. Al escribir se actualiza la vista mediante useState, como el contador de clase.

```jsx
import { useState } from 'react';
import { useSolicitudes } from '../context/SolicitudesContext';
import TarjetaSolicitud from '../components/TarjetaSolicitud';
export default function Solicitudes() {
  const { solicitudes } = useSolicitudes();
  const [busqueda, setBusqueda] = useState('');
  const visibles = solicitudes.filter(s => s.estudiante.toLowerCase().includes(busqueda.toLowerCase().trim()));
  return <section><h1>Solicitudes</h1>
    <label htmlFor="busqueda">Buscar estudiante</label>
    <input id="busqueda" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
    {visibles.length === 0 && <p>No hay coincidencias.</p>}
    {visibles.map(s => <TarjetaSolicitud key={s.id} solicitud={s} />)}
  </section>;
}
```

### src/pages/NuevaSolicitud.jsx

Pantalla provisional: Paola la reemplazará. Tener la ruta no significa que el formulario esté implementado.

```jsx
export default function NuevaSolicitud() {
  return <section><h1>Nueva solicitud</h1><p>Formulario pendiente de la etapa de Paola.</p></section>;
}
```

### src/pages/DetalleSolicitud.jsx

Pantalla provisional: Paola leerá el parámetro id y consumirá el Context.

```jsx
export default function DetalleSolicitud() {
  return <section><h1>Detalle</h1><p>Detalle pendiente de la etapa de Paola.</p></section>;
}
```

### src/pages/Favoritos.jsx

Pantalla provisional: Mariano implementará aquí su flujo Redux, sin cambiar el modelo de solicitudes.

```jsx
export default function Favoritos() {
  return <section><h1>Favoritos</h1><p>Flujo Redux pendiente de la etapa de Mariano.</p></section>;
}
```

### src/pages/NoEncontrado.jsx

Una URL que no coincide con las rutas muestra un mensaje y un enlace de retorno.

```jsx
import { Link } from 'react-router';
export default function NoEncontrado() {
  return <section><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></section>;
}
```

### src/App.jsx

La estructura de rutas queda estable para el equipo. Paola revisará navegación, parámetros y mensajes al terminar sus pantallas.

```jsx
import { Routes, Route } from 'react-router';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Solicitudes from './pages/Solicitudes';
import NuevaSolicitud from './pages/NuevaSolicitud';
import DetalleSolicitud from './pages/DetalleSolicitud';
import Favoritos from './pages/Favoritos';
import NoEncontrado from './pages/NoEncontrado';
export default function App() {
  return <><Menu /><main><Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="/solicitudes" element={<Solicitudes />} />
    <Route path="/nueva" element={<NuevaSolicitud />} />
    <Route path="/solicitudes/:id" element={<DetalleSolicitud />} />
    <Route path="/favoritos" element={<Favoritos />} />
    <Route path="*" element={<NoEncontrado />} />
  </Routes></main></>;
}
```

### src/main.jsx

El Provider de solicitudes está por encima de todas las rutas para mantener la misma lista al navegar. Si lo colocas dentro de una página, puede desmontarse al cambiar de vista.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { SolicitudesProvider } from './context/SolicitudesContext';
import App from './App';
import './styles.css';
createRoot(document.getElementById('root')).render(
  <StrictMode><BrowserRouter><SolicitudesProvider><App /></SolicitudesProvider></BrowserRouter></StrictMode>
);
```

### src/styles.css

Estilos sencillos compartidos. Paola y Mariano pueden usar archivos CSS propios si necesitan cambios, para no editar todos el mismo archivo.

```css
body { margin: 0; font-family: Arial, sans-serif; background: #f3f5f7; color: #172b40; }
nav { display: flex; flex-wrap: wrap; gap: 18px; padding: 20px; background: white; }
nav a.active { font-weight: bold; }
main { max-width: 900px; margin: 28px auto; padding: 0 20px; }
article { background: white; padding: 18px; margin: 14px 0; border: 1px solid #ccd4dc; border-radius: 8px; }
label { display: block; margin-top: 12px; }
input, select, textarea, button { font: inherit; padding: 8px; max-width: 100%; box-sizing: border-box; }
button { cursor: pointer; margin: 8px 8px 8px 0; }
a { color: #174f91; }
```

## 4. Ejecutar y comprobar tu entrega

Desde frontend:

```powershell
npm.cmd run dev
```

Abre la URL que muestre Vite, normalmente http://localhost:5173. Mantén el mismo origen durante las pruebas. No abras index.html por doble clic.

| Prueba | Resultado esperado |
|---|---|
| Inicio | Total 2 y pendientes 1 |
| Solicitudes | Dos tarjetas con datos ficticios |
| Buscar Ana | Solo una tarjeta |
| Buscar un nombre inexistente | Mensaje sin coincidencias |
| Borrar búsqueda | Reaparecen las dos tarjetas |
| Ir a Inicio | Se conserva la lista y cambia el título de la pestaña |
| Ir a Nueva/Detalle/Favoritos | Mensajes provisionales honestos |
| Abrir /ruta-inventada | Página no encontrada |

En DevTools → Network no deben aparecer llamadas a /api/solicitudes. No confundir las solicitudes de archivos JavaScript de Vite con consumo de una API. Las solicitudes están en memoria: F5 vuelve a los dos datos iniciales; todavía no hay persistencia entre recargas.

Para probar tu Context antes de que Paola termine, en Inicio puedes agregar temporalmente un botón que llame agregarSolicitud con un registro ficticio válido. Comprueba que el total aumenta y el registro se ve en Solicitudes. Luego retira ese botón de prueba y verifica nuevamente. Esta prueba demuestra que las dos vistas consumen la misma fuente de datos; la evidencia final se repetirá con el formulario real.

En otra terminal, dentro de frontend:

```powershell
npm.cmd run build
```

El build debe terminar sin errores. El build no reemplaza las pruebas de navegación o estado en el navegador. Si aparece pantalla en blanco, revisa la consola y que cada import coincida con el nombre y mayúsculas del archivo.

## 5. Capturas y commits reales

En la raíz crea `evidencias/santiago/`. Guarda las capturas cuando hayas ejecutado: inicio con resumen, listado/búsqueda, título de pestaña y compilación. Después de la integración, añade evidencia del cambio global al crear desde el formulario. No reutilices capturas ni el video de PA2.

Puedes hacer un commit cuando hayas armado y comprobado una primera base; otro cuando el Context/listado esté listo. No construyas un historial ficticio ni hagas commits con el nombre de tus compañeros. Antes de subir la etapa terminada:

```powershell
cd ..
git status
git add frontend/package.json frontend/package-lock.json frontend/index.html frontend/vite.config.js frontend/src evidencias/santiago
git diff --cached --stat
git diff --cached --name-only
git commit -m "Crear base React, listado y estado compartido de solicitudes"
git push -u origin santiago-base-react
```

Si hiciste commits intermedios, añade solamente los cambios restantes. No subas node_modules ni dist. Sigue el documento 06 para crear el PR a main y usar Create a merge commit. Comprueba que el autor sea tu cuenta. Actualiza en README tu fila solo cuando las pruebas estén realizadas; incluye el PR real.

## 6. Entrega concreta a Paola y Mariano

Diles: main contiene frontend, npm ci funciona, las rutas están definidas y el Context expone solicitudes/agregarSolicitud/cambiarEstado. Ambos actualizan main y crean sus ramas. Paola modifica NuevaSolicitud y DetalleSolicitud; Mariano modifica Favoritos, Menu y main.jsx para agregar Redux. Evita seguir cambiando esos archivos durante sus etapas.

No necesitas esperar a que ellos terminen para considerar entregada tu base; para demostrar la actualización global final sí deben integrar el formulario y repetir la prueba en conjunto.

## Lo que debes explicar (unos 3 minutos del video)

- JSX y componentes: main → App → página → tarjeta, con props.
- useState local de búsqueda frente a lista compartida del Context.
- Provider, useContext y actualización sin mutación.
- useEffect con dependencia solicitudes.length y limpieza del título.
- Navegación sin recarga; por qué los datos se reinician con F5.
- Tu commit/PR y una prueba real. No afirmar que MongoDB guarda estas solicitudes.

Fuentes de apoyo: [useContext](https://react.dev/reference/react/useContext), [useEffect](https://react.dev/reference/react/useEffect), [React Router declarativo](https://reactrouter.com/start/declarative/installation). Los ejemplos adaptan conceptos al caso académico; Router y Context no se atribuyen como código mostrado en la transcripción del 27/10.
