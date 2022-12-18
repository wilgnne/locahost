import { readFileSync } from 'fs'
import path from 'path'

import { MySQLDataBase } from '../src/infra/MySQLDataBase'

interface TmdbMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

async function main (): Promise<void> {
  try {
    const dump = readFileSync('./dump.json')
    const json: TmdbMovie[] = JSON.parse(dump.toString())

    const DIs = json.map((movie) => {
      const {
        release_date: releaseDate,
        title,
        vote_average: voteAverage,
        overview,
        backdrop_path: backdropPath,
        poster_path: posterPath
      } = movie

      const leaseTime = Math.round(2 + (10 - voteAverage))
      const leaseValue = 3 * voteAverage
      const feeValue = 1.5 * voteAverage
      const amount = 1 + Math.floor(3 * (voteAverage / 10))

      const posterUrl = path.join('https://image.tmdb.org/t/p/w500', posterPath)
      const coverUrl = path.join('https://image.tmdb.org/t/p/w500', backdropPath)

      return `(
  "${title}",
  "${releaseDate}",
  ${leaseTime},
  ${leaseValue},
  ${feeValue},
  "${overview}",
  ${amount},
  "${posterUrl}",
  "${coverUrl}"
)`
    })

    const sql = `INSERT INTO movie (
  title,
  releaseDate,
  leaseTime,
  leaseValue,
  feeValue,
  synopsis,
  amount,
  posterUrl,
  coverUrl
) VALUES ${DIs.join(',\n')};`

    await MySQLDataBase.getConnection().query(sql)
  } catch (error) {
    console.log(error)
  }
}

main().catch(console.log)
