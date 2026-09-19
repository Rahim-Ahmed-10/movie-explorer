import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { stripHtml, getYear } from '../utils/api.js'
import RatingRing from './RatingRing.jsx'

function InfoTile({ label, value, delay = 0 }) {
  if (!value) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-3.5 backdrop-blur-xl transition-all duration-300 hover:border-[#f0a839]/50 hover:shadow-lg hover:shadow-[#f0a839]/10"
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a3ae]">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-white tracking-wide">{value}</p>
    </motion.div>
  )
}

export default function MovieModal({ show, onClose }) {
  useEffect(() => {
    if (!show) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [show, onClose])

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${show.name}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-[#121118] sm:grid-cols-[40%_60%] shadow-2xl shadow-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Poster Column with Cinematic Glow */}
            <div className="relative min-h-[300px] bg-black sm:sticky sm:top-0 sm:h-full sm:min-h-[560px] sm:self-start overflow-hidden">
              {show.image?.original || show.image?.medium ? (
                <img
                  src={show.image.original || show.image.medium}
                  alt={show.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[#a8a3ae] text-xs">
                  No image available
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#121118] via-transparent to-black/40 sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[#121118]" />

              {show.rating?.average ? (
                <div className="absolute left-4 top-4 rounded-full bg-black/80 p-2 backdrop-blur-md border border-[#f0a839]/40 shadow-2xl shadow-[#f0a839]/20">
                  <RatingRing value={show.rating.average} size={48} stroke={4} />
                </div>
              ) : null}
            </div>

            {/* Details Column */}
            <div className="relative p-6 sm:p-10 flex flex-col justify-between">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close details"
                className="group absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-[#f0a839] hover:bg-[#f0a839] hover:text-black hover:scale-105 shadow-lg"
              >
                <span className="transition-transform duration-300 group-hover:rotate-90 font-bold">
                  ✕
                </span>
              </button>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#f0a839] animate-pulse" />
                  <p className="text-xs font-black uppercase tracking-widest text-[#f0a839]">
                    {show.status || 'Featured Show'}
                  </p>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl drop-shadow-md"
                >
                  {show.name}
                </motion.h2>

                {show.genres?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {show.genres.map((genre, i) => (
                      <motion.span
                        key={genre}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f0a839] backdrop-blur-md"
                      >
                        {genre}
                      </motion.span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <InfoTile label="Premiered" value={getYear(show.premiered)} delay={0.1} />
                  <InfoTile
                    label="Runtime"
                    value={
                      show.averageRuntime || show.runtime
                        ? `${show.averageRuntime || show.runtime} min`
                        : null
                    }
                    delay={0.15}
                  />
                  <InfoTile label="Language" value={show.language} delay={0.2} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-6"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a8a3ae] mb-2">
                    Overview
                  </p>
                  <p className="text-sm leading-relaxed text-[#d1cbdc]">
                    {stripHtml(show.summary) ||
                      'No summary available for this show.'}
                  </p>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-8 flex items-center gap-4 pt-4 border-t border-white/10"
              >
                <button
                  onClick={() => alert(`Playing ${show.name}...`)}
                  className="flex-1 rounded-2xl bg-[#f0a839] py-3.5 text-xs font-black uppercase tracking-widest text-black shadow-xl shadow-[#f0a839]/20 transition-all duration-300 hover:bg-[#ffb74d] hover:scale-[1.02]"
                >
                  ▶ Watch Trailer
                </button>
                <button
                  onClick={onClose}
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                >
                  Close
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}