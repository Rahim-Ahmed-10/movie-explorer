import { motion } from 'framer-motion'

export default function RatingRing({ value, size = 56, stroke = 4 }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(10, value || 0)) / 10
  const offset = circumference * (1 - pct)

  const color = !value
    ? 'var(--color-ink-line)'
    : pct >= 0.75
      ? 'var(--color-marquee)'
      : pct >= 0.5
        ? 'var(--color-marquee-soft)'
        : 'var(--color-velvet-soft)'

  return (
    <div className="relative shrink-0" style={{width: size, height: size}}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-ink-line)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{strokeDashoffset: circumference}}
          animate={{strokeDashoffset: value ? offset : circumference}}
          transition={{duration: 1, ease: "easeOut"}}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-paper">
        {value ? value.toFixed(1) : "—"}⭐
      </span>
    </div>
  );
}
