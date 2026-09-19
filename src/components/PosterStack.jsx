import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import PosterStack from '../components/PosterStack'
import { fetchAllShows } from '../utils/api'

export default function Home() {
  const [trendingShows, setTrendingShows] = useState([])

  useEffect(() => {
    fetchAllShows().then((data) => {
      // API থেকে প্রথম ৫টি শো এর ডেটা পোস্টার স্ট্যাকের জন্য নিয়ে নিচ্ছি
      setTrendingShows(data.slice(0, 5))
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="max-w-[1440px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* বাম পাশের টেক্সট সেকশন */}
        <div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
            Discover Cinematic Universes
          </h1>
          <p className="mt-4 text-[#a8a3ae] text-base sm:text-lg">
            Explore thousands of TV shows, movies, and exclusive collections in stunning detail.
          </p>
        </div>

        {/* ডান পাশের PosterStack কম্পোনেন্ট */}
        <div className="w-full flex justify-center">
          <PosterStack posters={trendingShows} />
        </div>
      </main>
    </div>
  )
}