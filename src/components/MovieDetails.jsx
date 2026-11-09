import { Link, useParams } from 'react-router-dom'

function MovieDetails({ movies }) {
  const { movieId } = useParams()
  const movie = movies.find((item) => String(item.id) === movieId)

  if (!movie) {
    return (
      <section className="content detail-page">
        <Link className="back-link" to="/">← Retour à l’accueil</Link>
        <div className="empty-state">
          <h1>Film introuvable</h1>
          <p>Ce film n’est pas disponible dans votre collection.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="content detail-page">
      <Link className="back-link" to="/">← Retour à l’accueil</Link>
      <div className="detail-layout">
        <img className="detail-poster" src={movie.posterUrl} alt={`Affiche de ${movie.title}`} />
        <div className="detail-copy">
          <span className="eyebrow">★ {Number(movie.rating).toFixed(1)} / 10</span>
          <h1>{movie.title}</h1>
          <h2>Synopsis</h2>
          <p>{movie.description || 'Aucune description disponible.'}</p>
        </div>
      </div>
      <section className="trailer-section" aria-labelledby="trailer-title">
        <h2 id="trailer-title">Bande-annonce</h2>
        {movie.trailerUrl ? (
          <div className="trailer-frame">
            <iframe
              src={movie.trailerUrl}
              title={`Bande-annonce de ${movie.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="trailer-unavailable">Aucune bande-annonce n’a été ajoutée pour ce film.</p>
        )}
      </section>
    </section>
  )
}

export default MovieDetails
