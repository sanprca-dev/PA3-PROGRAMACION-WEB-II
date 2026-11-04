import { useSelector } from 'react-redux';

export default function ContadorFavoritos() {
  const cantidad = useSelector(state => state.favoritos.ids.length);
  return <span aria-live="polite">Favoritas: {cantidad}</span>;
}
