import { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion'
import { getYear } from '../utils/api.js'
import RatingRing from './RatingRing.jsx'

export default function MovieCard({ show, onOpenDetails }) {
  const cardRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const poster = show.image?.medium
  const rating = show.rating?.average

  // pointer position within the card, 0..1 on each axis
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), {
    stiffness: 150,
    damping: 22,
    mass: 0.4,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), {
    stiffness: 150,
    damping: 22,
    mass: 0.4,
  })
  const glowX = useTransform(px, (v) => `${v * 100}%`)
  const glowY = useTransform(py, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(200px circle at ${glowX} ${glowY}, rgba(240,168,57,0.35), transparent 65%)`

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function resetTilt() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative flex flex-col border border-transparent bg-ink-card transition-colors duration-300 hover:border-marquee/50"
    >
      <motion.button
        ref={cardRef}
        onClick={() => onOpenDetails(show)}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="relative block aspect-[2/3] w-full overflow-hidden text-left will-change-transform"
        aria-label={`View details for ${show.name}`}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 900,
          transformStyle: 'preserve-3d',
        }}
      >
        {poster && !imgError ? (
          <img
            src={poster}
            alt={show.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-paper-dim">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="1.5" />
              <path d="M2 15l5-5 4 4 5-6 6 7" />
            </svg>
            <span className="text-xs">No poster available</span>
          </div>
        )}

        {/* cursor-tracking spotlight */}
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/5 to-transparent" />

        {rating ? (
          <div className="absolute right-2 top-2 rounded-full bg-ink/75 p-0.5 backdrop-blur-sm">
            <RatingRing value={rating} size={38} stroke={3} />
          </div>
        ) : null}

        <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-marquee opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View details ▸
        </span>
      </motion.button>

      {/* film-ticket perforation divider */}
      <div className="relative border-t border-dashed border-ink-line">
        <span className="absolute -left-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-ink" />
        <span className="absolute -right-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-ink" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 font-semibold text-paper">{show.name}</h3>
        <div className="flex items-center gap-2 text-xs text-paper-dim">
          <span className="uppercase tracking-wide">
            {getYear(show.premiered)}
          </span>
          {show.genres?.length ? (
            <span className="border border-ink-line px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-marquee">
              {show.genres[0]}
            </span>
          ) : null}
        </div>
        <button
          onClick={() => onOpenDetails(show)}
          className="group/btn relative mt-auto w-full overflow-hidden border border-ink-line py-2 text-sm font-medium text-paper transition-colors duration-300 hover:border-marquee hover:text-ink"
        >
          <span className="absolute inset-0 -translate-x-full bg-marquee transition-transform duration-300 group-hover/btn:translate-x-0" />
          <span className="relative z-10 group-hover/btn:text-ink">
            See details
          </span>
        </button>
      </div>
    </motion.div>
  )
}
