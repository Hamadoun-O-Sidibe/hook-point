function MovieFilter({ titleFilter, ratingFilter, onTitleChange, onRatingChange, resultCount }) {
  return (
    <div className="filters">
      <label className="search-field">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={titleFilter}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Rechercher un film..."
        />
      </label>
      <label className="rating-field">
        <span>Note minimale</span>
        <select value={ratingFilter} onChange={(event) => onRatingChange(event.target.value)}>
          <option value="0">Toutes les notes</option>
          <option value="5">5+ étoiles</option>
          <option value="6">6+ étoiles</option>
          <option value="7">7+ étoiles</option>
          <option value="8">8+ étoiles</option>
          <option value="9">9+ étoiles</option>
        </select>
      </label>
      <span className="result-count">{resultCount} film{resultCount > 1 ? 's' : ''}</span>
    </div>
  )
}

export default MovieFilter
