import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import MovieCard from '../components/MovieCard.jsx'
import MovieModal from '../components/MovieModal.jsx'
import { fetchAllShows, searchShows, sortByRating } from '../utils/api.js'

// ক্যাটাগরি বা জেনারগুলোর তালিকা
const CATEGORIES = ['All', 'Drama', 'Action', 'Comedy', 'Sci-Fi', 'Thriller', 'Crime', 'Romance', 'Horror']

export default function Listing() {
  const [allShows, setAllShows] = useState([])
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [searching, setSearching] = useState(false)
  const [selectedShow, setSelectedShow] = useState(null)

  // initial load of the full catalog
  useEffect(() => {
    const controller = new AbortController()
    fetchAllShows(controller.signal)
      .then((data) => {
        const sorted = sortByRating(data)
        setAllShows(sorted)
        setResults(sorted)
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error')
      })
    return () => controller.abort()
  }, [])

  // debounced search against TVMaze whenever the query changes
  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      setResults(allShows)
      setSearching(false)
      return
    }

    setSearching(true)
    const controller = new AbortController()
    const timer = setTimeout(() => {
      searchShows(trimmed, controller.signal)
        .then((data) => {
          setResults(data)
          setSearching(false)
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            setResults([])
            setSearching(false)
          }
        })
    }, 50)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, allShows])

  // ক্যাটাগরি অনুযায়ী ফিল্টার করা লজিক
  const filteredShows = useMemo(() => {
    if (selectedCategory === 'All') return results
    return results.filter((show) => show.genres?.includes(selectedCategory))
  }, [results, selectedCategory])

  const heading = useMemo(() => {
    let text = query.trim() ? `Results for "${query.trim()}"` : 'Popular right now'
    if (selectedCategory !== 'All') {
      text += ` in ${selectedCategory}`
    }
    return text
  }, [query, selectedCategory])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="marquee-title text-4xl text-paper sm:text-5xl"
          >
            Browse the catalog
          </motion.h1>

          {/* সার্চ বার */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 max-w-xl"
          >
            <SearchBar value={query} onChange={setQuery} loading={searching} />
          </motion.div>

          {/* ক্যাটাগরি বার যুক্ত করা হলো */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6"
          >
            <CategoryBar
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-medium uppercase tracking-wide text-paper-dim">
              {heading}
            </p>
            {status === 'ready' && (
              <p className="text-sm text-paper-dim">
                {filteredShows.length} {filteredShows.length === 1 ? 'show' : 'shows'}
              </p>
            )}
          </div>

          {status === 'loading' && (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="border border-ink-line bg-ink-soft">
                  <div className="skeleton aspect-[2/3] w-full" />
                  <div className="space-y-2 p-4">
                    <div className="skeleton h-4 w-4/5" />
                    <div className="skeleton h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="border border-ink-line bg-ink-soft p-8 text-center">
              <p className="text-paper-dim">
                Couldn't reach the show catalog. Check your connection and try again.
              </p>
            </div>
          )}

          {status === 'ready' && filteredShows.length === 0 && (
            <div className="border border-ink-line bg-ink-soft p-8 text-center">
              <p className="text-paper-dim">
                No shows match your filter criteria. Try a different title or category.
              </p>
            </div>
          )}

          {status === 'ready' && filteredShows.length > 0 && (
            <motion.div
              layout="position"
              className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredShows.map((show) => (
                  <MovieCard
                    key={show.id}
                    show={show}
                    onOpenDetails={setSelectedShow}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />

      <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
    </div>
  )
}