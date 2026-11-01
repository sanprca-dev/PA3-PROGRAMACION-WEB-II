# Paola: formulario, detalle y navegación

## 1. Recibir la base de Santiago

Espera a que el PR de Santiago esté integrado. Clona PA3 si aún no lo tienes; de lo contrario abre tu clon. Desde su raíz, sin cambios pendientes:

```powershell
git switch main
git pull --ff-only origin main
git config user.name
git config user.email
git switch -c paola-formulario-rutas
cd frontend
npm.cmd ci
npm.cmd run dev
```

Si trabajas en fork, actualiza desde upstream según el documento 06. Configura tu identidad antes del primer commit. Usa tu cuenta; no la de Santiago.

## 2. Entender antes de reemplazar

Abre App.jsx: ya tiene rutas para /nueva y /solicitudes/:id. main.jsx contiene BrowserRouter y SolicitudesProvider. Santiago dejó mensajes provisionales en tus dos páginas. Tu parte convierte esas rutas en vistas reales, con formulario, detalle y manejo de errores. Revisa cómo Link en TarjetaSolicitud envía el id en la URL.

Lee el documento 05. No necesitas Express, Axios ni MongoDB. Los campos se guardan en el Context que ya existe, no en otro array de tu página.

## 3. Formulario controlado

Reemplaza frontend/src/pages/NuevaSolicitud.jsx con el ejemplo de abajo, escribiéndolo por secciones. Primero entiende el estado datos y cambiar; después la validación y enviar; al final el JSX.

Cada input tiene value y onChange: React controla su contenido. name permite que una función actualice el campo correspondiente. preventDefault evita el envío HTML que recargaría la página. noValidate desactiva mensajes automáticos del navegador para que se muestren los que escribimos; por eso se comprueban todos los campos antes de guardar. Usamos código como texto para conservar ceros iniciales.

### frontend/src/pages/NuevaSolicitud.jsx

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSolicitudes } from '../context/SolicitudesContext';
import { TIPOS } from '../data/solicitudesIniciales';

export default function NuevaSolicitud() {
  const [datos, setDatos] = useState({ estudiante: '', codigo: '', correo: '', tipo: TIPOS[0], motivo: '' });
  const [error, setError] = useState('');
  const { agregarSolicitud } = useSolicitudes();
  const navigate = useNavigate();

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos(actual => ({ ...actual, [name]: value }));
  }

  function enviar(evento) {
    evento.preventDefault();
    const limpio = { ...datos, estudiante: datos.estudiante.trim(), codigo: datos.codigo.trim(), correo: datos.correo.trim(), motivo: datos.motivo.trim() };
    if (limpio.estudiante.length < 3 || limpio.estudiante.length > 80) {
      setError('El estudiante debe tener entre 3 y 80 caracteres.'); return;
    }
    if (!/^[0-9]{8}$/.test(limpio.codigo)) { setError('El código debe tener ocho dígitos.'); return; }
    if (limpio.correo.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio.correo)) {
      setError('Ingresa un correo válido de hasta 120 caracteres.'); return;
    }
    if (!TIPOS.includes(limpio.tipo)) { setError('Selecciona un tipo permitido.'); return; }
    if (limpio.motivo.length < 20 || limpio.motivo.length > 500) {
      setError('El motivo debe tener entre 20 y 500 caracteres.'); return;
    }
    setError('');
    const id = agregarSolicitud(limpio);
    navigate(`/solicitudes/${id}`);
  }

  return <section><h1>Nueva solicitud</h1>
    <form onSubmit={enviar} noValidate>
      <label htmlFor="estudiante">Estudiante</label>
      <input id="estudiante" name="estudiante" value={datos.estudiante} onChange={cambiar} required />
      <label htmlFor="codigo">Código</label>
      <input id="codigo" name="codigo" inputMode="numeric" value={datos.codigo} onChange={cambiar} required />
      <label htmlFor="correo">Correo</label>
      <input id="correo" name="correo" type="email" value={datos.correo} onChange={cambiar} required />
      <label htmlFor="tipo">Tipo</label>
      <select id="tipo" name="tipo" value={datos.tipo} onChange={cambiar}>
        {TIPOS.map(tipo => <option key={tipo}>{tipo}</option>)}
      </select>
      <label htmlFor="motivo">Motivo</label>
      <textarea id="motivo" name="motivo" value={datos.motivo} onChange={cambiar} required />
      {error && <p role="alert">{error}</p>}
      <button type="submit">Registrar solicitud</button>
    </form>
  </section>;
}
```

## 4. Detalle y cambio de estado

Reemplaza la página provisional. useParams lee el id de la URL; find busca en el Context. Si no existe, renderiza un mensaje y retorno. El select llama cambiarEstado y los demás consumidores se actualizan. No copies la solicitud a otro useState: podría quedar desactualizada.

### frontend/src/pages/DetalleSolicitud.jsx

```jsx
import { Link, useParams } from 'react-router';
import { useSolicitudes } from '../context/SolicitudesContext';
import { ESTADOS } from '../data/solicitudesIniciales';
export default function DetalleSolicitud() {
  const { id } = useParams();
  const { solicitudes, cambiarEstado } = useSolicitudes();
  const solicitud = solicitudes.find(s => s.id === id);
  if (!solicitud) return <section><h1>Solicitud no encontrada</h1><Link to="/solicitudes">Volver al listado</Link></section>;
  return <section><h1>Detalle de solicitud</h1>
    <p>Estudiante: {solicitud.estudiante}</p><p>Código: {solicitud.codigo}</p>
    <p>Correo: {solicitud.correo}</p><p>Tipo: {solicitud.tipo}</p>
    <p>Motivo: {solicitud.motivo}</p><p>Fecha: {new Date(solicitud.fecha).toLocaleDateString('es-PE')}</p>
    <label htmlFor="estado">Estado</label>
    <select id="estado" value={solicitud.estado} onChange={e => cambiarEstado(id, e.target.value)}>
      {ESTADOS.map(estado => <option key={estado}>{estado}</option>)}
    </select>
    <p><Link to="/solicitudes">Volver al listado</Link></p>
  </section>;
}
```

## 5. Revisar la navegación completa

Abre App.jsx y explica cada ruta. Prueba enlaces del Menu, el Link de cada tarjeta, navegación al detalle después de registrar y botón Atrás del navegador. No hace falta reescribir las rutas si las que entregó Santiago ya cumplen: tu aporte de navegación se demuestra conectando las pantallas reales y resolviendo sus casos.

Distingue /ruta-inventada (NoEncontrado) de /solicitudes/no-existe (tu mensaje de documento ausente). La ruta /solicitudes/demo-1 funciona al abrirse directamente porque ese dato existe en la semilla. El id nuevo creado en memoria deja de existir tras F5; muestra el mensaje esperado, no prometas persistencia.

## 6. Pruebas que te corresponden

| Caso | Resultado |
|---|---|
| Formulario vacío | Mensaje y sin registro nuevo |
| Estudiante solo espacios | Rechazo |
| Código abc o siete dígitos | Rechazo |
| Código 00123456 | Se conserva como texto de ocho dígitos |
| Correo sin @ | Rechazo |
| Motivo Hola | Rechazo |
| Registro válido | Navega al detalle del nuevo id |
| Volver a lista e Inicio | Aparece la solicitud y aumenta el total |
| Estado Pendiente → Atendida | Detalle/lista reflejan cambio; Inicio reduce pendientes |
| URL inexistente y Atrás | Mensajes y navegación correctos |
| F5 después de crear | Vuelve la semilla; id creado ya no existe |

Revisa la consola y ejecuta npm.cmd run build desde frontend. Guarda capturas propias en evidencias/paola: formulario, validación, detalle del registro, cambio reflejado en otra vista y ruta inexistente. No publiques datos reales de compañeros.

## 7. Commit y PR

Desde raíz, después de ejecutar tus pruebas:

```powershell
git add frontend/src/pages/NuevaSolicitud.jsx frontend/src/pages/DetalleSolicitud.jsx evidencias/paola
git diff --cached --stat
git diff --cached
git commit -m "Implementar formulario y detalle con navegacion React"
git push -u origin paola-formulario-rutas
```

Si modificaste otros archivos necesarios, revísalos y añádelos explícitamente. El documento 06 explica el PR; incluye capturas y pruebas reales. No marques tu parte terminada solo por copiar el ejemplo. Comprueba también la integración después de que Mariano añada su Provider.

## Para explicar en el video (3 minutos)

- App.jsx y sus rutas, Link frente a recargar la página.
- useState del formulario, onChange, preventDefault y validaciones.
- useNavigate tras crear y useParams al consultar.
- El formulario escribe en Context y otra vista refleja el cambio.
- Cambio de estado y mensajes cuando el id no existe.

Referencia de apoyo: [React Router declarativo](https://reactrouter.com/start/declarative/routing).
