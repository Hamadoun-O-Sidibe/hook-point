import { Link } from 'react-router-dom'

function MovieCard({ movie, onEdit, onDelete }) {
  return (
    <article className="movie-card">
      <Link className="movie-card-link" to={`/movies/${movie.id}`} aria-label={`Voir les détails de ${movie.title}`}>
        <div className="poster-wrap">
          <img src={movie.posterUrl} alt={`Affiche de ${movie.title}`} />
          <span className="rating-badge">★ {Number(movie.rating).toFixed(1)}</span>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
        </div>
      </Link>
      <div className="card-actions">
        <button className="icon-button edit-button" type="button" onClick={() => onEdit(movie)}>
          Modifier
        </button>
        <button className="icon-button delete-button" type="button" onClick={() => onDelete(movie.id)}>
          Supprimer
        </button>
      </div>
    </article>
  )
}

export default MovieCard
