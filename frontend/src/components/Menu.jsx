import { NavLink } from 'react-router';
import ContadorFavoritos from './ContadorFavoritos';
export default function Menu() {
  return <nav aria-label="Navegación principal">
    <NavLink to="/" end>Inicio</NavLink>
    <NavLink to="/solicitudes">Solicitudes</NavLink>
    <NavLink to="/nueva">Nueva solicitud</NavLink>
    <NavLink to="/favoritos">Favoritos</NavLink>
    <ContadorFavoritos />
  </nav>;
}
