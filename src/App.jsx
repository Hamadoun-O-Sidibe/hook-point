import { useEffect, useState } from 'react'
import MovieFilter from './components/MovieFilter'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'
import './App.css'

const STORAGE_KEY = 'hook-point-movies'

const seedMovies = [
  { id: 1, title: 'Dune: Deuxième partie', description: 'Paul Atréides sunit aux Fremen et entreprend une guerre pour assurer lavenir de son peuple.', posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', rating: 8.5 },
  { id: 2, title: 'Oppenheimer', description: 'Le génie controversé du projet Manhattan change à jamais le cours de lhistoire.', posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', rating: 8.3 },
  { id: 3, title: 'Interstellar', description: 'Une équipe dexplorateurs traverse un trou de ver pour sauver lhumanité.', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', rating: 8.7 },
  { id: 4, title: 'Le Seigneur des Anneaux', description: 'Un hobbit entreprend une quête périlleuse pour détruire un anneau maléfique.', posterUrl: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', rating: 9.0 },
  { id: 5, title: 'Spider-Man: Across the Spider-Verse', description: 'Miles Morales explore un multivers où il rencontre une équipe de Spider-People.', posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', rating: 8.6 },
  { id: 6, title: 'Blade Runner 2049', description: 'Un blade runner découvre un secret enfoui qui pourrait bouleverser la société.', posterUrl: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', rating: 8.0 },
]

function App() {
  const [movies, setMovies] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : seedMovies
    } catch {
      return seedMovies
    }
  })
  const [titleFilter, setTitleFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState('0')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
  }, [movies])

  const filteredMovies = movies.filter((movie) => (
    movie.title.toLowerCase().includes(titleFilter.toLowerCase().trim()) &&
    movie.rating >= Number(ratingFilter)
  ))

  const openAddForm = () => {
    setEditingMovie(null)
    setIsFormOpen(true)
  }

  const saveMovie = (movieData) => {
    if (editingMovie) {
      setMovies((current) => current.map((movie) => (
        movie.id === editingMovie.id ? { ...movieData, id: editingMovie.id } : movie
      )))
    } else {
      setMovies((current) => [{ ...movieData, id: Date.now() }, ...current])
    }
    setIsFormOpen(false)
    setEditingMovie(null)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-mark">M</span>
          <span>MOVIEBOX</span>
        </button>
        <button className="add-button" type="button" onClick={openAddForm}>
          <span>＋</span> Ajouter un film
        </button>
      </header>

      <section className="content">
        <div className="title-row">
          <div>
            <span className="eyebrow">Ma collection</span>
            <h1>Mes films</h1>
          </div>
        </div>
        <MovieFilter
          titleFilter={titleFilter}
          ratingFilter={ratingFilter}
          onTitleChange={setTitleFilter}
          onRatingChange={setRatingFilter}
          resultCount={filteredMovies.length}
        />
        <MovieList
          movies={filteredMovies}
          onEdit={(movie) => {
            setEditingMovie(movie)
            setIsFormOpen(true)
          }}
          onDelete={(id) => setMovies((current) => current.filter((movie) => movie.id !== id))}
        />
      </section>

      {isFormOpen && (
        <MovieForm
          isOpen={isFormOpen}
          editingMovie={editingMovie}
          onSave={saveMovie}
          onClose={() => {
            setIsFormOpen(false)
            setEditingMovie(null)
          }}
        />
      )}
    </main>
  )
}

export default App
