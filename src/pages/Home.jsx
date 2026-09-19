import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import MovieCard from '../components/MovieCard.jsx' // MovieCard কম্পোনেন্টটি ইম্পোর্ট করা হলো
import { fetchAllShows, sortByRating } from '../utils/api.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

export default function Home() {
  const [posters, setPosters] = useState([])
  const [trending, setTrending] = useState([])
  const [activeIndex, setActiveIndex] = useState(2)
  const [selectedShow, setSelectedShow] = useState(null) // মডালের জন্য স্টেট

  useEffect(() => {
    const controller = new AbortController()
    fetchAllShows(controller.signal)
      .then((data) => {
        const sorted = sortByRating(data).filter((s) => s.image?.medium)
        setPosters(sorted.slice(0, 5))
        setTrending(sorted.slice(0, 4))
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % posters.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + posters.length) % posters.length)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0c11] text-[#f5f1ea] selection:bg-[#f0a839] selection:text-[#0d0c11]">
      <Navbar />

      <main className="flex-1">
        {/* Cinematic 3D Carousel Banner Section */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-[#2c2933] px-6 py-20">
          <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[450px] w-[450px] rounded-full bg-[#f0a839]/10 blur-[140px]" />

          <div className="relative mx-auto max-w-[1440px] w-full px-4 text-center z-10">
            <motion.div initial="hidden" animate="show" className="flex flex-col items-center">
              
              <motion.div 
                variants={fadeUp} 
                custom={0}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17151d]/90 border border-[#2c2933] backdrop-blur-md mb-6 shadow-xl"
              >
                <span className="w-2 h-2 rounded-full bg-[#f0a839] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#f0a839]">
                  Cinematic Experience
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="text-4xl sm:text-6xl font-black tracking-tight text-[#f5f1ea] uppercase mb-4"
              >
                Featured Collections
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.15}
                className="text-sm sm:text-base text-[#a8a3ae] max-w-lg mb-10"
              >
                Immerse yourself in top-rated masterpieces curated meticulously for true cinema enthusiasts.
              </motion.p>

              {/* 3D Cover Flow Carousel Track Container */}
              {posters.length > 0 && (
                <div className="relative w-full max-w-4xl h-[360px] sm:h-[420px] flex items-center justify-center my-4">
                  
                  {/* Left Navigation Arrow */}
                  <button 
                    onClick={handlePrev}
                    className="absolute left-0 sm:left-4 z-30 p-4 rounded-full bg-[#17151d]/90 border border-[#2c2933] text-[#f5f1ea] hover:bg-[#f0a839] hover:border-[#f0a839] hover:text-[#0d0c11] hover:scale-110 transition-all duration-300 shadow-2xl backdrop-blur-md group flex items-center justify-center"
                    aria-label="Previous Slide"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Cards Track */}
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {posters.map((show, index) => {
                      let offset = index - activeIndex;
                      if (offset < -2) offset += posters.length;
                      if (offset > 2) offset -= posters.length;

                      const isActive = offset === 0;
                      const isVisible = Math.abs(offset) <= 2;

                      if (!isVisible) return null;

                      return (
                        <motion.div
                          key={show.id}
                          className={`absolute transition-all duration-500 ease-out cursor-pointer rounded-2xl overflow-hidden border ${
                            isActive 
                              ? 'z-20 w-44 sm:w-60 aspect-[2/3] border-[#f0a839] shadow-2xl shadow-[#f0a839]/25 scale-105' 
                              : 'z-10 w-32 sm:w-44 aspect-[2/3] border-[#2c2933] opacity-40 blur-[1px] hover:opacity-70'
                          }`}
                          style={{
                            transform: `translateX(${offset * 120}px) scale(${isActive ? 1 : 0.85}) perspective(1000px) rotateY(${offset * -12}deg)`,
                          }}
                          onClick={() => setActiveIndex(index)}
                        >
                          <img
                            src={show.image.medium}
                            alt={show.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c11] via-transparent opacity-75" />
                          {isActive && (
                            <div className="absolute bottom-4 left-3 right-3 text-center">
                              <p className="text-xs sm:text-sm font-extrabold text-[#f5f1ea] truncate drop-shadow-md">
                                {show.name}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Right Navigation Arrow */}
                  <button 
                    onClick={handleNext}
                    className="absolute right-0 sm:right-4 z-30 p-4 rounded-full bg-[#17151d]/90 border border-[#2c2933] text-[#f5f1ea] hover:bg-[#f0a839] hover:border-[#f0a839] hover:text-[#0d0c11] hover:scale-110 transition-all duration-300 shadow-2xl backdrop-blur-md group flex items-center justify-center"
                    aria-label="Next Slide"
                  >
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Enhanced Interactive Dots Indicator */}
              <div className="flex items-center gap-3 mt-6">
                {posters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? 'w-10 bg-[#f0a839] shadow-md shadow-[#f0a839]/30' : 'w-2.5 bg-[#2c2933] hover:bg-[#a8a3ae]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Action Button */}
              <motion.div variants={fadeUp} custom={0.3} className="mt-8">
                <Link
                  to="/movies"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#f0a839] px-8 py-4 text-sm sm:text-base font-extrabold text-[#0d0c11] shadow-xl shadow-[#f0a839]/20 transition-all duration-300 hover:bg-[#ffd08a] hover:scale-105"
                >
                  <span>Explore Catalog</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* Ultra-Premium Features Cards Section */}
        <section className="mx-auto max-w-[1440px] px-6 py-20">
          <div className="grid gap-8 sm:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                n: '01',
                title: 'Instant Database Search',
                body: 'Access live records instantaneously straight from comprehensive entertainment catalogs.',
              },
              {
                n: '02',
                title: 'Advanced Filtering',
                body: 'Evaluate critic ratings, release periods, and classifications seamlessly without friction.',
              },
              {
                n: '03',
                title: 'Comprehensive Details',
                body: 'Inspect deep storylines, broadcasting networks, and schedules before streaming.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl bg-gradient-to-b from-[#1c1924] to-[#121017] border border-[#2c2933] backdrop-blur-xl transition-all duration-500 hover:border-[#f0a839]/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#f0a839]/15 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f0a839] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <p className="text-4xl font-black bg-gradient-to-r from-[#f0a839] to-[#ffd08a] bg-clip-text text-transparent mb-4">
                  {item.n}
                </p>
                <h3 className="text-xl font-extrabold text-[#f5f1ea] mb-3 group-hover:text-[#f0a839] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-[#a8a3ae] leading-relaxed group-hover:text-[#c5c0ce] transition-colors duration-300">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Section - Fixed with MovieCard Component */}
        {trending.length > 0 && (
          <section id="trending" className="border-t border-[#2c2933] py-20 bg-[#0d0c11]">
            <div className="mx-auto max-w-[1440px] px-6">
              <div className="max-w-6xl mx-auto mb-10 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#f0a839] mb-1">
                    Curated Selection
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f5f1ea]">
                    Trending Now
                  </h2>
                </div>
                <Link
                  to="/movies"
                  className="text-sm font-semibold text-[#f0a839] transition-colors hover:text-[#ffd08a] flex items-center gap-1.5 group"
                >
                  View All <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* Grid Container using MovieCard */}
            <div className="max-w-[1440px] mx-auto px-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {trending.map((show, i) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <MovieCard show={show} onOpenDetails={setSelectedShow} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}