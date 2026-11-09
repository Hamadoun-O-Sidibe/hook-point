import { useEffect, useState } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import MovieFilter from './components/MovieFilter'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import './App.css'

const STORAGE_KEY = 'hook-point-movies'

const seedMovies = [
  { id: 1, title: 'Dune: Deuxième partie', description: 'Paul Atréides s’unit aux Fremen et entreprend une guerre pour assurer l’avenir de son peuple.', trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w', posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', rating: 8.5 },
  { id: 2, title: 'Oppenheimer', description: 'Le génie controversé du projet Manhattan change à jamais le cours de l’histoire.', trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg', posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', rating: 8.3 },
  { id: 3, title: 'Interstellar', description: 'Une équipe d’explorateurs traverse un trou de ver pour sauver l’humanité.', trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', rating: 8.7 },
  { id: 4, title: 'Le Seigneur des Anneaux', description: 'Un hobbit entreprend une quête périlleuse pour détruire un anneau maléfique.', trailerUrl: 'https://www.youtube.com/embed/V75dMMg5KN4', posterUrl: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', rating: 9.0 },
  { id: 5, title: 'Spider-Man: Across the Spider-Verse', description: 'Miles Morales explore un multivers où il rencontre une équipe de Spider-People.', trailerUrl: 'https://www.youtube.com/embed/shW9i6k8cB0', posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', rating: 8.6 },
  { id: 6, title: 'Blade Runner 2049', description: 'Un blade runner découvre un secret enfoui qui pourrait bouleverser la société.', trailerUrl: 'https://www.youtube.com/embed/gCcx85zbxz4', posterUrl: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', rating: 8.0 },
]

function App() {
  const [movies, setMovies] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const storedMovies = saved ? JSON.parse(saved) : seedMovies
      return storedMovies.map((movie) => {
        const seededMovie = seedMovies.find((seedMovie) => seedMovie.id === movie.id)
        return { ...movie, trailerUrl: movie.trailerUrl || seededMovie?.trailerUrl || '' }
      })
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
    <HashRouter>
      <main className="app-shell">
        <header className="topbar">
          <Link className="brand" to="/">
            <span className="brand-mark">M</span>
            <span>MOVIEBOX</span>
          </Link>
          <button className="add-button" type="button" onClick={openAddForm}>
            <span>＋</span> Ajouter un film
          </button>
        </header>

        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/movies/:movieId" element={<MovieDetails movies={movies} />} />
          <Route path="*" element={<MovieDetails movies={[]} />} />
        </Routes>

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
    </HashRouter>
  )
}

export default App
