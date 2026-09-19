import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { stripHtml, getYear } from '../utils/api.js'
import RatingRing from './RatingRing.jsx'

function InfoTile({ label, value, delay = 0 }) {
  if (!value) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="border border-ink-line bg-ink-soft px-3 py-2"
    >
      <p className="text-[10px] uppercase tracking-widest text-paper-dim">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium text-paper">{value}</p>
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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${show.name}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="modal-scroll relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-ink-line bg-ink-card sm:grid-cols-[38%_62%]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* poster / backdrop column */}
            <div className="relative min-h-[240px] bg-ink sm:sticky sm:top-0 sm:h-full sm:min-h-[520px] sm:self-start">
              {show.image?.original || show.image?.medium ? (
                <img
                  src={show.image.original || show.image.medium}
                  alt={show.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-paper-dim">
                  No image available
                </div>
              )}
              <div className="grain" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-ink-card" />

              {show.rating?.average ? (
                <div className="absolute left-4 top-4 rounded-full bg-ink/70 p-1 backdrop-blur-sm">
                  <RatingRing value={show.rating.average} size={52} stroke={4} />
                </div>
              ) : null}
            </div>

            {/* details column */}
            <div className="relative p-6 sm:p-8">
              <button
                onClick={onClose}
                aria-label="Close details"
                className="group absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-paper/30 bg-ink/70 text-paper backdrop-blur-sm transition-colors hover:border-marquee hover:text-marquee"
              >
                <span className="transition-transform duration-300 group-hover:rotate-90">
                  ✕
                </span>
              </button>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-sm font-medium uppercase tracking-widest text-velvet-soft"
              >
                {show.status || 'Show'}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="marquee-title mt-1 text-4xl text-paper sm:text-5xl"
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
                      className="border border-marquee/50 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-marquee"
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
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-6"
              >
                <p className="text-sm font-medium uppercase tracking-wide text-velvet-soft">
                  Overview
                </p>
                <p className="mt-2 text-base leading-relaxed text-paper-dim">
                  {stripHtml(show.summary) ||
                    'No summary available for this show.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="mt-8"
              >
                <button
                  onClick={onClose}
                  className="w-3xs border border-ink-line py-2.5 text-sm font-medium uppercase tracking-wide text-paper-dim transition-colors duration-300 hover:border-marquee hover:text-marquee"
                >
                  Cancel
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
