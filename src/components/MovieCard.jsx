function MovieCard({ movie, onEdit, onDelete }) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img src={movie.posterUrl} alt={`Affiche de ${movie.title}`} />
        <span className="rating-badge">★ {movie.rating.toFixed(1)}</span>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <div className="card-actions">
          <button className="icon-button edit-button" type="button" onClick={() => onEdit(movie)}>
            Modifier
          </button>
          <button className="icon-button delete-button" type="button" onClick={() => onDelete(movie.id)}>
            Supprimer
          </button>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
