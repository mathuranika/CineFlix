"use client"
import Image from 'next/image'
import { useCallback, useState } from 'react'

type Movie = {
  id: number
  title: string
  poster_path: string | null
  vote_average?: number
  overview?: string
  release_date?: string
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [flipped, setFlipped] = useState(false)

  const handleDoubleClick = useCallback(() => {
    setFlipped((f) => !f)
  }, [])

  return (
    <div className={`card3d ${flipped ? 'is-flipped' : ''}`} onDoubleClick={handleDoubleClick}>
      <div className="card3d-inner">
        <div className="card3d-face card3d-front">
          <div className="relative">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto"
              />
            ) : (
              <div className="aspect-[2/3] grid place-items-center text-sm bg-neutral-100">No image</div>
            )}
            <div className="absolute left-2 top-2 px-2 py-1 text-[10px] rounded-full bg-black/70 text-white">⭐ {movie.vote_average?.toFixed(1) ?? '—'}</div>
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white text-sm font-medium truncate" title={movie.title}>{movie.title}</div>
              <div className="text-neutral-200 text-[11px]">{movie.release_date?.slice(0,4) ?? '—'}</div>
            </div>
          </div>
        </div>
        <div className="card3d-face card3d-back">
          <div className="p-3 h-full flex flex-col bg-gradient-to-b from-[#141824] to-[#0a0e1a] text-white">
            <div className="text-sm font-bold mb-2 leading-tight">{movie.title}</div>
            <div className="flex items-center gap-3 mb-3 text-xs">
              <span className="text-blue-400">{movie.release_date?.slice(0,4) || '—'}</span>
              {movie.vote_average && (
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-gray-300">{movie.vote_average.toFixed(1)}</span>
                </span>
              )}
            </div>
            <div className="text-xs leading-relaxed text-gray-300 overflow-auto flex-1">{movie.overview || 'No summary available.'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

