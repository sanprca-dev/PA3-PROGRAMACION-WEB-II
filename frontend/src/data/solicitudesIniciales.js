export const TIPOS = ['Constancia de estudios', 'Cambio de horario', 'Revisión de nota'];
export const ESTADOS = ['Pendiente', 'En revisión', 'Atendida'];
export const solicitudesIniciales = [
  { id: 'demo-1', estudiante: 'Ana de prueba', codigo: '20260001', correo: 'ana@example.com', tipo: TIPOS[0], motivo: 'Necesito una constancia para mis prácticas.', estado: 'Pendiente', fecha: '2026-11-01T12:00:00.000Z' },
  { id: 'demo-2', estudiante: 'Luis de prueba', codigo: '20260002', correo: 'luis@example.com', tipo: TIPOS[1], motivo: 'Solicito cambiar el horario por motivos de trabajo.', estado: 'En revisión', fecha: '2026-11-01T13:00:00.000Z' }
];