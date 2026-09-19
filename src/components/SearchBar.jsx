import { motion } from 'framer-motion'

export default function SearchBar({ value, onChange, loading }) {
  return (
    <div className="group relative w-full max-w-2xl mx-auto">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-marquee/30 via-transparent to-marquee/10 blur-md opacity-0 group-focus-within:opacity-100 transition duration-500" />
      
      <div className="relative flex items-center bg-ink-soft border border-ink-line rounded-2xl px-4 py-1 shadow-xl transition-all duration-300 group-focus-within:border-marquee">
        <svg
          className="pointer-events-none text-paper-dim transition-colors group-focus-within:text-marquee shrink-0 mr-3"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for movies, TV shows, genres..."
          aria-label="Search for a show by title"
          className="w-full bg-transparent py-3 text-paper placeholder:text-paper-dim text-sm sm:text-base outline-none font-medium"
        />

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center ml-2 shrink-0"
          >
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-ink-line border-t-marquee" />
          </motion.div>
        )}

        {!loading && value && (
          <button
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="ml-2 flex items-center justify-center w-7 h-7 rounded-full bg-ink-line/40 text-paper-dim transition-all hover:bg-marquee hover:text-ink-soft shrink-0"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}