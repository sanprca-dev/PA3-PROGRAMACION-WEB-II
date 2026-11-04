import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSolicitudes } from '../context/SolicitudesContext';
import { alternarFavorito, vaciarFavoritos } from '../store/favoritosSlice';

export default function Favoritos() {
  const { solicitudes } = useSolicitudes();
  const ids = useSelector(state => state.favoritos.ids);
  const dispatch = useDispatch();
  const seleccionadas = solicitudes.filter(s => ids.includes(s.id));

  return <section>
    <h1>Favoritos</h1>
    <p>Selecciona solicitudes para encontrarlas con facilidad.</p>

    <h2>Solicitudes disponibles</h2>
    {solicitudes.map(s => <article key={s.id}>
      <p>{s.estudiante} · {s.tipo}</p>
      <button type="button" aria-pressed={ids.includes(s.id)} onClick={() => dispatch(alternarFavorito(s.id))}>
        {ids.includes(s.id) ? 'Quitar de favoritos' : 'Marcar favorita'}
      </button>
    </article>)}

    <h2>Mi selección ({seleccionadas.length})</h2>
    {seleccionadas.length === 0
      ? <p>No tienes favoritos.</p>
      : <ul>
        {seleccionadas.map(s => <li key={s.id}>
          <Link to={`/solicitudes/${s.id}`}>{s.estudiante} · {s.estado}</Link>
        </li>)}
      </ul>}

    <button type="button" disabled={ids.length === 0} onClick={() => dispatch(vaciarFavoritos())}>
      Vaciar favoritos
    </button>
  </section>;
}
