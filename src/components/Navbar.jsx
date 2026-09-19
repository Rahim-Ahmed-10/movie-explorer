import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <motion.header
      initial={{y: -24, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.5, ease: "easeOut"}}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(240,168,57,0.15)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:rotate-45"
          >
            <rect
              x="1"
              y="1"
              width="22"
              height="22"
              rx="2"
              stroke="#f0a839"
              strokeWidth="1.5"
            />
            <circle cx="6.5" cy="6.5" r="1.6" fill="#f0a839" />
            <circle cx="17.5" cy="6.5" r="1.6" fill="#f0a839" />
            <circle cx="6.5" cy="17.5" r="1.6" fill="#f0a839" />
            <circle cx="17.5" cy="17.5" r="1.6" fill="#f0a839" />
            <circle
              cx="12"
              cy="12"
              r="2.6"
              stroke="#f0a839"
              strokeWidth="1.3"
            />
          </svg>
          <span className="marquee-title text-2xl text-paper">CineScope</span>
        </Link>

        <Link
          to="/movies"
          className="group relative hidden overflow-hidden border border-marquee px-5 py-2 text-sm font-medium sm:inline-block"
        >
          <span className="absolute inset-0 -translate-x-full bg-marquee transition-transform duration-300 group-hover:translate-x-0" />
          <span className="relative z-10 text-marquee transition-colors duration-300 group-hover:text-ink">
            Browse movies
          </span>
        </Link>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="relative flex h-9 w-9 items-center justify-center border border-ink-line text-paper sm:hidden"
        >
          <motion.span
            animate={{rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0}}
            className="absolute block h-[1.5px] w-4 bg-paper"
          />
          <motion.span
            animate={{opacity: menuOpen ? 0 : 1}}
            className="absolute block h-[1.5px] w-4 bg-paper"
          />
          <motion.span
            animate={{rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0}}
            className="absolute block h-[1.5px] w-4 bg-paper"
          />
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{height: 0, opacity: 0}}
          animate={{height: "auto", opacity: 1}}
          exit={{height: 0, opacity: 0}}
          className="overflow-hidden border-t border-ink-line bg-ink sm:hidden"
        >
          <Link
            to="/movies"
            className="block px-6 py-4 text-sm font-medium text-marquee"
          >
            Browse movies →
          </Link>
        </motion.div>
      )}

      <div className="sprocket-rule" />
    </motion.header>
  );
}
