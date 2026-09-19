import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
  const scrollRef = useRef(null)

  // মাউস হুইল দিয়ে স্মুথলি স্ক্রল করার জন্য
  const handleWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto py-2">
      {/* দুই পাশের হালকা ফেড ইফেক্ট */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#0d0c11] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0d0c11] to-transparent z-10" />

      {/* ক্যাটাগরি পিলস কন্টেইনার */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto scrollbar-none px-6 py-2 scroll-smooth select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <motion.button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-[#f0a839] text-[#0d0c11] shadow-lg shadow-[#f0a839]/30 ring-2 ring-[#f0a839]/50'
                  : 'bg-[#17151d] text-[#a8a3ae] border border-[#2c2933] hover:border-[#f0a839]/40 hover:text-[#f5f1ea] hover:bg-[#1c1924]'
              }`}
            >
              {cat}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}