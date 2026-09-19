import { motion } from 'framer-motion'

const layout = [
  { x: '-4%', y: '6%', rotate: -8, size: 'w-28 sm:w-36', z: 10, delay: 0 },
  { x: '22%', y: '-4%', rotate: 4, size: 'w-32 sm:w-40', z: 20, delay: 0.1 },
  { x: '48%', y: '10%', rotate: -3, size: 'w-28 sm:w-36', z: 10, delay: 0.2 },
  { x: '10%', y: '38%', rotate: 6, size: 'w-24 sm:w-32', z: 5, delay: 0.3 },
  { x: '58%', y: '40%', rotate: -6, size: 'w-24 sm:w-32', z: 5, delay: 0.4 },
]

export default function PosterStack({ posters }) {
  if (!posters?.length) return null

  return (
    <div className="relative h-[320px] w-full sm:h-[380px]">
      {layout.slice(0, posters.length).map((pos, i) => (
        <motion.div
          key={posters[i].id}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
            rotate: pos.rotate,
          }}
          transition={{
            opacity: { duration: 0.6, delay: pos.delay },
            rotate: { duration: 0.6, delay: pos.delay },
            y: {
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pos.delay,
            },
          }}
          style={{ left: pos.x, top: pos.y, zIndex: pos.z }}
          className={`absolute ${pos.size} overflow-hidden border-2 border-ink-line shadow-2xl shadow-black/50`}
        >
          <img
            src={posters[i].image?.medium}
            alt={posters[i].name}
            className="aspect-[2/3] w-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}
