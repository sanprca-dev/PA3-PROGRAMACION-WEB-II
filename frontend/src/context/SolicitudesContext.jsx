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