import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Listing from './pages/Listing.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Listing />} />
    </Routes>
  )
}
