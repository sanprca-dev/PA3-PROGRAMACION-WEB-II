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