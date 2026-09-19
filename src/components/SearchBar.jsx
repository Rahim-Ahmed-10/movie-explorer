import { motion } from 'framer-motion'

export default function SearchBar({ value, onChange, loading }) {
  return (
    <div className="group relative">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-paper-dim transition-colors group-focus-within:text-marquee"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a show by title…"
        aria-label="Search for a show by title"
        className="w-full border border-ink-line bg-ink-soft py-3.5 pl-11 pr-11 text-paper placeholder:text-paper-dim transition-colors focus:border-marquee focus:outline-none"
      />

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-ink-line border-t-marquee" />
        </motion.div>
      )}

      {!loading && value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-dim transition-colors hover:text-marquee"
        >
          ✕
        </button>
      )}
    </div>
  )
}
