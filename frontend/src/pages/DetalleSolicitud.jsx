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
