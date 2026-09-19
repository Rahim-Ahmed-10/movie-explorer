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

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), {
    stiffness: 150,
    damping: 22,
    mass: 0.4,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), {
    stiffness: 150,
    damping: 22,
    mass: 0.4,
  })
  const glowX = useTransform(px, (v) => `${v * 100}%`)
  const glowY = useTransform(py, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(240,168,57,0.4), transparent 70%)`

  function handleMouseMove(e) {
    if (!cardRef.current) return
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl border border-[#2c2933] bg-[#17151d] overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#f0a839] hover:-translate-y-1.5 hover:shadow-[#f0a839]/20"
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center text-[#a8a3ae] bg-[#17151d]">
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
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Dark Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0c11] via-transparent to-black/30" />

        {/* High Contrast Solid Rating Badge */}
        {rating ? (
          <div className="absolute right-3 top-3 rounded-full bg-[#0d0c11] p-1.5 backdrop-blur-md border-2 border-[#f0a839] shadow-xl">
            <RatingRing value={rating} size={36} stroke={3.5} />
          </div>
        ) : null}

        <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-center text-xs font-extrabold uppercase tracking-widest text-[#f0a839] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 drop-shadow">
          View details ▸
        </span>
      </motion.button>

      {/* Ticket perforation divider style */}
      <div className="relative border-t border-dashed border-[#2c2933] bg-[#17151d]">
        <span className="absolute -left-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-[#0d0c11]" />
        <span className="absolute -right-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-[#0d0c11]" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 bg-[#17151d]">
        <h3 className="line-clamp-1 font-bold text-[#f5f1ea] text-base group-hover:text-[#f0a839] transition-colors">
          {show.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-[#a8a3ae]">
          <span className="uppercase tracking-wider font-semibold text-[#c5c0ce]">
            {getYear(show.premiered)}
          </span>
          {show.genres?.length ? (
            <span className="border border-[#2c2933] bg-[#0d0c11] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[#f0a839] rounded-md font-medium">
              {show.genres[0]}
            </span>
          ) : null}
        </div>

        <button
          onClick={() => onOpenDetails(show)}
          className="group/btn relative mt-auto w-full overflow-hidden rounded-xl bg-[#0d0c11] border border-[#2c2933] py-2.5 text-sm font-extrabold text-[#f5f1ea] transition-all duration-300 hover:border-[#f0a839] hover:text-[#0d0c11] shadow-md"
        >
          <span className="absolute inset-0 -translate-x-full bg-[#f0a839] transition-transform duration-300 group-hover/btn:translate-x-0" />
          <span className="relative z-10">
            See details
          </span>
        </button>
      </div>
    </motion.div>
  )
}