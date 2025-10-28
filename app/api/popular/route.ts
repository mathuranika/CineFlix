import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  const key = process.env.TMDB_API_KEY
  const token = process.env.TMDB_ACCESS_TOKEN
  const url = new URL('https://api.themoviedb.org/3/movie/popular')
  if (key) url.searchParams.set('api_key', key)

  const headers: Record<string, string> = { accept: 'application/json' }
  if (!key && token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { headers, next: { revalidate } })
  const data = await res.json()
  return NextResponse.json(data)
}

