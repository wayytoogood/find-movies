import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const SingleMovie = () => {
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState({})
  const { id } = useParams()

  const fetchMovie = async () => {
    const idURL = `&i=${id}`
    const url = `${API_ENDPOINT}${idURL}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setMovie(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [])

  if (loading) {
    return <div className='loading'></div>
  }

  let { Title, Year, Actors, Plot, Poster, imdbRating, Type } = movie

  if (Poster === 'N/A') {
    Poster = defaultImage
  }

  return (
    <section className='single-movie'>
      <img src={Poster} alt='' />
      <div className='single-movie-info'>
        <h2>{Title}</h2>
        <p>{Plot}</p>
        <h4 style={{ marginBottom: '1.25rem' }}>Type: {Type}</h4>
        <h4 style={{ marginBottom: '1.25rem' }}>Release Date: {Year}</h4>
        <h4>Imdb Rate: {imdbRating}</h4>
        <p style={{ fontSize: '1rem', fontWeight: '500' }}>
          Main Actors: {Actors}
        </p>
        <Link className='btn' to='/'>
          Back Home
        </Link>
      </div>
    </section>
  )
}

export default SingleMovie
