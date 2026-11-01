import { Link } from 'react-router';
export default function TarjetaSolicitud({ solicitud }) {
  return <article>
    <h2>{solicitud.estudiante}</h2>
    <p>{solicitud.tipo} · {solicitud.estado}</p>
    <Link to={`/solicitudes/${solicitud.id}`}>Ver detalle</Link>
  </article>;
}