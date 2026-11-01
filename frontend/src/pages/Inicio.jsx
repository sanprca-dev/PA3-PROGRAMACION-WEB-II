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