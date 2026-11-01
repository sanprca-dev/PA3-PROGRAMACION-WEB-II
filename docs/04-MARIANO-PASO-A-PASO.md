# Mariano: Redux básico y comparación con Context

## 1. Partir de la entrega de Santiago

Espera su PR integrado. Desde tu clon limpio de PA3, con tu propia identidad Git:

```powershell
git switch main
git pull --ff-only origin main
git config user.name
git config user.email
git switch -c mariano-favoritos-redux
cd frontend
npm.cmd ci
npm.cmd install @reduxjs/toolkit@2 react-redux@9
mkdir src/store
```

Si usas fork, consulta el documento 06. Esta instalación cambia package.json y package-lock.json: ambos son parte de tu entrega. No necesitas esperar al formulario de Paola: los dos datos iniciales sirven para probar favoritos.

## 2. Entender la necesidad

Context ya guarda solicitudes. Redux guardará solo sus ids favoritos, porque la página Favoritos y el contador del menú necesitan compartir esa selección. No uses un contador aislado sin relación con el caso ni dupliques los documentos completos en Redux.

Redux Toolkit evita configuración repetitiva: sigue siendo Redux. No usarás peticiones asíncronas, RTK Query, middleware personalizado ni autenticación. El flujo a explicar es botón → dispatch de una acción con id → reducer → nuevo estado → componentes suscritos.

## 3. Crear slice, store y lectores

Crea los siguientes archivos; Favoritos.jsx reemplaza el mensaje provisional de Santiago. Entiende cada bloque antes de continuar.

### frontend/src/store/favoritosSlice.js

```js
import { createSlice } from '@reduxjs/toolkit';
const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState: { ids: [] },
  reducers: {
    alternarFavorito(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) state.ids = state.ids.filter(actual => actual !== id);
      else state.ids.push(id);
    },
    vaciarFavoritos(state) { state.ids = []; }
  }
});
export const { alternarFavorito, vaciarFavoritos } = favoritosSlice.actions;
export default favoritosSlice.reducer;
```

### frontend/src/store/store.js

```js
import { configureStore } from '@reduxjs/toolkit';
import favoritosReducer from './favoritosSlice';
export const store = configureStore({ reducer: { favoritos: favoritosReducer } });
```

### frontend/src/components/ContadorFavoritos.jsx

```jsx
import { useSelector } from 'react-redux';
export default function ContadorFavoritos() {
  const cantidad = useSelector(state => state.favoritos.ids.length);
  return <span aria-live="polite">Favoritas: {cantidad}</span>;
}
```

### frontend/src/pages/Favoritos.jsx

```jsx
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSolicitudes } from '../context/SolicitudesContext';
import { alternarFavorito, vaciarFavoritos } from '../store/favoritosSlice';
export default function Favoritos() {
  const { solicitudes } = useSolicitudes();
  const ids = useSelector(state => state.favoritos.ids);
  const dispatch = useDispatch();
  const seleccionadas = solicitudes.filter(s => ids.includes(s.id));
  return <section><h1>Favoritos</h1>
    <p>Selecciona solicitudes para encontrarlas con facilidad.</p>
    <h2>Solicitudes disponibles</h2>
    {solicitudes.map(s => <article key={s.id}>
      <p>{s.estudiante} · {s.tipo}</p>
      <button type="button" aria-pressed={ids.includes(s.id)} onClick={() => dispatch(alternarFavorito(s.id))}>
        {ids.includes(s.id) ? 'Quitar de favoritos' : 'Marcar favorita'}
      </button>
    </article>)}
    <h2>Mi selección ({seleccionadas.length})</h2>
    {seleccionadas.length === 0 ? <p>No tienes favoritos.</p> : <ul>
      {seleccionadas.map(s => <li key={s.id}><Link to={`/solicitudes/${s.id}`}>{s.estudiante} · {s.estado}</Link></li>)}
    </ul>}
    <button type="button" disabled={ids.length === 0} onClick={() => dispatch(vaciarFavoritos())}>Vaciar favoritos</button>
  </section>;
}
```

Dentro de createSlice, Toolkit utiliza Immer para producir actualizaciones inmutables a partir de ese estilo de escritura. No copies state.ids.push al Context de Santiago: fuera de esos reducers no debes mutar el estado React. alternar evita duplicados porque una segunda pulsación quita el id.

## 4. Conectar una sola vez el Provider

En frontend/src/main.jsx agrega estas importaciones:

```jsx
import { Provider } from 'react-redux';
import { store } from './store/store';
```

Conserva las importaciones anteriores y cambia solo el árbol del render a:

```jsx
<StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <SolicitudesProvider><App /></SolicitudesProvider>
    </BrowserRouter>
  </Provider>
</StrictMode>
```

No elimines SolicitudesProvider y no crees un store dentro de cada página. En components/Menu.jsx importa ContadorFavoritos desde './ContadorFavoritos' y añade `<ContadorFavoritos />` dentro de nav. Esto demuestra que dos componentes distintos leen el mismo store.

## 5. Probar el flujo

Desde frontend: npm.cmd run dev. Ve a /favoritos, marca demo-1 y comprueba el contador del menú en 1. Navega a Inicio y vuelve: la selección sigue. Marca la otra: 2. Quita una: 1. Vacía: 0 y mensaje sin favoritos; el botón queda deshabilitado.

Cuando esté integrado Paola: crea una solicitud y márcala; cambia su estado en Detalle y comprueba que Favoritos muestra el nuevo estado porque consulta los documentos del Context por id. Recargar reinicia ambas fuentes de estado: es el comportamiento acordado, no persistencia de base de datos.

Si ves 'could not find react-redux context', revisa que Provider envuelva Menu y Favoritos. Si state.favoritos no existe, revisa el nombre reducer del store. No resuelvas un import roto instalando paquetes al azar.

## 6. Escribir la comparación a partir de lo probado

Crea docs/COMPARACION-CONTEXT-REDUX.md después de implementarlo. Usa esta estructura y completa con tus observaciones:

| Aspecto | Context en nuestro proyecto | Redux en nuestro proyecto |
|---|---|---|
| Información | Documentos de solicitudes | Ids de favoritos |
| Actualización | agregarSolicitud/cambiarEstado del Provider | dispatch(alternarFavorito(id)) |
| Lectura | useSolicitudes, basado en useContext | useSelector |
| Archivos | Context y consumidores | Slice, store, Provider y consumidores |
| Ventaja observada | Comparte una lista con una configuración pequeña | Hace explícitas las acciones y centraliza su transición |
| Coste observado | Conviene organizar el Provider al crecer | Requiere más conceptos y archivos para una selección simple |

Explica que favoritos también podría resolverse con Context en una aplicación pequeña; Redux se incluye aquí para comparar un flujo real que exige el examen. No afirmar que Redux es siempre más rápido o que Context almacena en disco. No escribir conclusiones de pruebas que no hayas realizado.

## 7. Evidencias y PR

Ejecuta npm.cmd run build. Guarda capturas propias en evidencias/mariano: selección vacía, selección con contador, permanencia al navegar y vaciado. Después de integrar el formulario, prueba una solicitud nueva y el estado actualizado. Cada integrante conserva sus evidencias: no te corresponde preparar las de todos.

Desde la raíz, revisa y confirma:

```powershell
git add frontend/package.json frontend/package-lock.json frontend/src/store frontend/src/components/ContadorFavoritos.jsx frontend/src/components/Menu.jsx frontend/src/pages/Favoritos.jsx frontend/src/main.jsx docs/COMPARACION-CONTEXT-REDUX.md evidencias/mariano
git diff --cached --stat
git diff --cached
git commit -m "Agregar favoritos con Redux y comparar gestion de estado"
git push -u origin mariano-favoritos-redux
```

Sigue el documento 06 para abrir PR, revisar e integrar sin cambiar autores. Si el README cambió con otra entrega, actualiza la rama antes de añadir tu fila de evidencias.

## Para explicar en el video (3 minutos)

- Necesidad compartida: selección y contador.
- createSlice, acción/payload, configureStore, Provider, useDispatch y useSelector.
- Demostración: marcar, navegar, quitar y vaciar.
- Context conserva documentos; Redux guarda ids. No se pierde coherencia al cambiar estado.
- Comparación breve y razón por la que la solución sigue siendo pequeña.

Referencia: [inicio rápido de Redux](https://redux.js.org/tutorials/quick-start). Usamos JavaScript, no los tipos TypeScript de algunos ejemplos oficiales. Redux no aparece desarrollado en las transcripciones adjuntas; se incorpora por el requisito explícito de PA3.
