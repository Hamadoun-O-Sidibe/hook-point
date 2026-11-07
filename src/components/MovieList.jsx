import MovieCard from './MovieCard'

function MovieList({ movies, onEdit, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <span>⌕</span>
        <h2>Aucun film trouvé</h2>
        <p>Essayez de modifier vos filtres.</p>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default MovieList
