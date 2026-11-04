# Comparación Context API y Redux en nuestro proyecto

En la aplicación conviven dos formas de compartir estado. Cada una guarda datos distintos, así que no se duplica información:

- **Context** (`SolicitudesContext`, de Santiago) guarda los documentos completos de las solicitudes.
- **Redux** (`favoritosSlice`, de Mariano) guarda solo los **ids** de las solicitudes marcadas como favoritas.

La página Favoritos cruza ambas fuentes: toma los ids de Redux y busca los documentos en Context. Por eso, si una solicitud cambia de estado en el detalle, Favoritos muestra el estado nuevo sin tener que sincronizar nada.

## Tabla comparativa

| Aspecto | Context en nuestro proyecto | Redux en nuestro proyecto |
|---|---|---|
| Información | Documentos de solicitudes | Ids de favoritos |
| Actualización | `agregarSolicitud` / `cambiarEstado` del Provider | `dispatch(alternarFavorito(id))` y `dispatch(vaciarFavoritos())` |
| Lectura | `useSolicitudes`, basado en `useContext` | `useSelector` |
| Archivos | `SolicitudesContext.jsx` y los componentes que lo consumen | `favoritosSlice.js`, `store.js`, `Provider` en `main.jsx`, `ContadorFavoritos.jsx` y `Favoritos.jsx` |
| Ventaja observada | Comparte una lista con poca configuración: un archivo con Provider y hook | Las acciones son explícitas y todas las transiciones del estado están en un solo lugar (el slice) |
| Costo observado | Al crecer, el Provider acumula funciones y conviene organizarlo | Requiere más conceptos (slice, store, acción, dispatch, selector) y más archivos para una selección simple |

## Flujo de Redux implementado

1. El usuario pulsa **Marcar favorita** en `/favoritos`.
2. El botón ejecuta `dispatch(alternarFavorito(id))`; el id viaja en `action.payload`.
3. El reducer `alternarFavorito` agrega el id si no estaba o lo quita si ya estaba, de modo que nunca hay duplicados. Redux Toolkit usa Immer para producir el estado nuevo de forma inmutable.
4. El store guarda el nuevo estado `{ favoritos: { ids: [...] } }`.
5. Los componentes suscritos con `useSelector` se vuelven a renderizar: el contador del menú (`ContadorFavoritos`) y la página `Favoritos`.

El `Provider` de react-redux se coloca una sola vez en `main.jsx`, por encima de `BrowserRouter` y de `SolicitudesProvider`. Ambos Providers coexisten porque comparten datos distintos.

## Pruebas realizadas

Con los datos iniciales `demo-1` y `demo-2`:

| Acción | Contador del menú | Mi selección | Botón Vaciar |
|---|---|---|---|
| Estado inicial | Favoritas: 0 | "No tienes favoritos." | Deshabilitado |
| Marcar demo-1 | Favoritas: 1 | 1 solicitud | Habilitado |
| Marcar demo-2 | Favoritas: 2 | 2 solicitudes | Habilitado |
| Quitar demo-1 | Favoritas: 1 | 1 solicitud | Habilitado |
| Vaciar favoritos | Favoritas: 0 | "No tienes favoritos." | Deshabilitado |

Además, `npm run build` compila sin errores. Al navegar entre vistas la selección se conserva; al recargar (F5) se reinicia, porque el estado vive en memoria y no hay persistencia. Ese comportamiento es el acordado para esta etapa.

## Conclusión

En una aplicación de este tamaño, los favoritos también podrían resolverse con Context. Redux se incluye para cumplir la actividad 4 del examen y comparar ambos enfoques con un flujo real: una selección compartida entre dos componentes distintos (menú y página). En nuestro caso, Context resultó más directo para compartir la lista de solicitudes, y Redux hizo más visible el recorrido acción → reducer → store → componente, a cambio de más archivos y conceptos.
