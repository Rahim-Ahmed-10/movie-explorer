import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PosterStack from '../components/PosterStack.jsx'
import { fetchAllShows, sortByRating, getYear } from '../utils/api.js'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: 'easeOut' },
  }),
}

export default function Home() {
  const [posters, setPosters] = useState([])
  const [trending, setTrending] = useState([])
  const [heroBackdrop, setHeroBackdrop] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    fetchAllShows(controller.signal)
      .then((data) => {
        const sorted = sortByRating(data).filter((s) => s.image?.medium)
        setPosters(sorted.slice(0, 5))
        setTrending(sorted.slice(0, 10))
        const withLargeImage = sorted.find((s) => s.image?.original)
        if (withLargeImage) setHeroBackdrop(withLargeImage.image.original)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-ink-line">
          {/* movie-related background: a dimmed backdrop image over a cinematic gradient */}
          <div aria-hidden="true" className="absolute inset-0 -z-20">
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-soft to-ink" />
            {heroBackdrop && (
              <motion.img
                key={heroBackdrop}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.32, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                src={heroBackdrop}
                alt=""
                className="h-full w-full object-cover blur-[2px]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
          </div>

          <div className="grain -z-10" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-marquee/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-32 -z-10 h-64 w-64 rounded-full bg-velvet/10 blur-3xl"
          />

          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 md:grid-cols-2 md:items-center md:py-24">
            <motion.div initial="hidden" animate="show">
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-sm font-medium uppercase tracking-widest text-velvet-soft"
              >
                Now showing
              </motion.p>
              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="marquee-title mt-4 text-6xl text-paper sm:text-7xl md:text-6xl lg:text-7xl"
              >
                Find something
                <br />
                worth watching
                <span className="text-marquee">.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="mt-6 max-w-md text-lg text-paper-dim"
              >
                Search thousands of shows, check the ratings before you
                commit, and settle tonight's watch in under a minute.
              </motion.p>
              <motion.div variants={fadeUp} custom={0.3}>
                <Link
                  to="/movies"
                  className="group relative mt-9 inline-flex items-center gap-2 overflow-hidden border-2 border-marquee bg-marquee px-8 py-3 text-base font-semibold text-ink transition-colors duration-300 hover:bg-transparent hover:text-marquee"
                >
                  Explore now
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            <div className="hidden md:block">
              <PosterStack posters={posters} />
            </div>
          </div>
          <div className="sprocket-rule" />
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              {
                n: '01',
                title: 'Search anything',
                body: 'Look up a title and get matches pulled live from the TVMaze catalog.',
              },
              {
                n: '02',
                title: 'Compare at a glance',
                body: 'Ratings, release year, and genre sit right on the card — no extra clicks.',
              },
              {
                n: '03',
                title: 'Read the full summary',
                body: 'Open a details view for the synopsis, network, and schedule before you press play.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="marquee-title text-4xl text-marquee">
                  {item.n}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-paper">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-paper-dim">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {trending.length > 0 && (
          <section className="border-t border-ink-line py-16">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-6 flex items-end justify-between">
                <h2 className="marquee-title text-3xl text-paper sm:text-4xl">
                  Trending now
                </h2>
                <Link
                  to="/movies"
                  className="text-sm font-medium text-marquee transition-colors hover:text-marquee-soft"
                >
                  See all →
                </Link>
              </div>
            </div>
            <div className="scrollbar-hide flex gap-5 overflow-x-auto px-6 pb-2 sm:justify-center sm:px-0 sm:pb-0">
              {trending.map((show, i) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
                  className="w-32 flex-shrink-0 sm:w-36"
                >
                  <div className="overflow-hidden border border-ink-line">
                    <img
                      src={show.image.medium}
                      alt={show.name}
                      className="aspect-[2/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 line-clamp-1 text-sm font-medium text-paper">
                    {show.name}
                  </p>
                  <p className="text-xs text-paper-dim">
                    {getYear(show.premiered)}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
