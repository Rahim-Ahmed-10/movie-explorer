const BASE_URL = 'https://api.tvmaze.com'

export async function fetchAllShows(signal) {
  const res = await fetch(`${BASE_URL}/shows`, { signal })
  if (!res.ok) throw new Error('Failed to load shows')
  return res.json()
}

export async function searchShows(query, signal) {
  const res = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
    { signal },
  )
  if (!res.ok) throw new Error('Failed to search shows')
  const data = await res.json()
  // /search/shows wraps each result as { score, show }
  return data.map((entry) => entry.show)
}

export function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

export function getYear(dateString) {
  if (!dateString) return 'TBA'
  return dateString.slice(0, 4)
}

export function sortByRating(shows) {
  return [...shows].sort(
    (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0),
  )
}
