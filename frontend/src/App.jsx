import { Routes, Route } from 'react-router';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Solicitudes from './pages/Solicitudes';
import NuevaSolicitud from './pages/NuevaSolicitud';
import DetalleSolicitud from './pages/DetalleSolicitud';
import Favoritos from './pages/Favoritos';
import NoEncontrado from './pages/NoEncontrado';
export default function App() {
  return <><Menu /><main><Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="/solicitudes" element={<Solicitudes />} />
    <Route path="/nueva" element={<NuevaSolicitud />} />
    <Route path="/solicitudes/:id" element={<DetalleSolicitud />} />
    <Route path="/favoritos" element={<Favoritos />} />
    <Route path="*" element={<NoEncontrado />} />
  </Routes></main></>;
}