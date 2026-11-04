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
