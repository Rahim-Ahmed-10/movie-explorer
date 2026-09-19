import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[#2c2933] bg-[#0d0c11] text-[#a8a3ae] pt-16 pb-12">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto pb-12 border-b border-[#2c2933]">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="text-xl font-black text-[#f5f1ea] tracking-wider uppercase">
              CINEMA<span className="text-[#f0a839]">VIBE</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#a8a3ae]">
              Your ultimate destination for discovering top-rated movies, series, and immersive cinematic experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#f5f1ea] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#f0a839] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-[#f0a839] transition-colors">Catalog / Movies</Link>
              </li>
              <li>
                <a href="#trending" className="hover:text-[#f0a839] transition-colors">Trending Now</a>
              </li>
            </ul>
          </div>

          {/* Categories / Genres */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#f5f1ea] mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-[#f0a839] transition-colors cursor-pointer">Action & Adventure</li>
              <li className="hover:text-[#f0a839] transition-colors cursor-pointer">Sci-Fi & Fantasy</li>
              <li className="hover:text-[#f0a839] transition-colors cursor-pointer">Drama & Mystery</li>
            </ul>
          </div>

          {/* Newsletter / Connect */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#f5f1ea] mb-4">
              Stay Updated
            </h4>
            <p className="text-xs text-[#a8a3ae] mb-3">
              Subscribe to get curated lists of blockbuster releases directly.
            </p>
            <div className="flex items-center rounded-xl bg-[#17151d] border border-[#2c2933] overflow-hidden p-1 focus-within:border-[#f0a839] transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent px-3 text-xs text-[#f5f1ea] focus:outline-none placeholder:text-[#6b6770]"
              />
              <button className="bg-[#f0a839] text-[#0d0c11] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#ffd08a] transition-all">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} CinemaVibe. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[#a8a3ae]">
            <span className="hover:text-[#f0a839] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#f0a839] cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#f0a839] cursor-pointer transition-colors">Support</span>
          </div>
        </div>

      </div>
    </footer>
  )
}