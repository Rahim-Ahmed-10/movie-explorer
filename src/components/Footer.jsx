import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-ink-line">
      <motion.div
        initial={{opacity: 0, y: 12}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.5}}
        className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left"
      >
        <div>
          <p className="marquee-title text-xl text-paper">cinescope</p>
          <p className="mt-1 text-sm text-paper-dim">
            © 2026 CineScope. Show data courtesy of TVMaze.
          </p>
        </div>
        <div className="flex gap-5 text-sm text-paper-dim">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-marquee"
          >
            GitHub
          </a>
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-marquee"
          >
            TVMaze API
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
