import { useState } from 'react'

const emptyMovie = {
  title: '',
  description: '',
  trailerUrl: '',
  posterUrl: '',
  rating: '',
}

function MovieForm({ isOpen, editingMovie, onSave, onClose }) {
  const [values, setValues] = useState(() => (
    editingMovie
      ? { ...emptyMovie, ...editingMovie, trailerUrl: editingMovie.trailerUrl ?? '', rating: String(editingMovie.rating) }
      : emptyMovie
  ))

  if (!isOpen) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const rating = Number(values.rating)
    if (!values.title.trim() || !values.description.trim() || !values.trailerUrl.trim() || !values.posterUrl.trim()) return
    if (Number.isNaN(rating) || rating < 0 || rating > 10) return
    onSave({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      trailerUrl: values.trailerUrl.trim(),
      posterUrl: values.posterUrl.trim(),
      rating,
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="movie-modal" role="dialog" aria-modal="true" aria-labelledby="movie-form-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">{editingMovie ? 'Mise à jour' : 'Nouvelle entrée'}</span>
            <h2 id="movie-form-title">{editingMovie ? 'Modifier le film' : 'Ajouter un film'}</h2>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label="Fermer">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Titre
            <input name="title" value={values.title} onChange={handleChange} placeholder="Ex: Inception" required />
          </label>
          <label>
            Description
            <textarea name="description" value={values.description} onChange={handleChange} placeholder="Un court résumé du film..." rows="4" required />
          </label>
          <label>
            Lien intégré de la bande-annonce
            <input name="trailerUrl" value={values.trailerUrl} onChange={handleChange} type="url" placeholder="https://www.youtube.com/embed/..." required />
          </label>
          <label>
            URL de l'affiche
            <input name="posterUrl" value={values.posterUrl} onChange={handleChange} type="url" placeholder="https://..." required />
          </label>
          <label>
            Note <span>/ 10</span>
            <input name="rating" value={values.rating} onChange={handleChange} type="number" min="0" max="10" step="0.1" placeholder="8.5" required />
          </label>
          <div className="form-actions">
            <button className="cancel-button" type="button" onClick={onClose}>Annuler</button>
            <button className="submit-button" type="submit">{editingMovie ? 'Enregistrer' : 'Ajouter le film'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default MovieForm
