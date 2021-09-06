import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movies = () => {
  const { displayedOnes, loading } = useGlobalContext()

  return (
    <>
      <section className='movies'>
        {displayedOnes.map((item) => {
          const { imdbID, Title, Year, Poster } = item

          return (
            <Link to={`/movies/${imdbID}`} key={imdbID} className='movie'>
              <article>
                <img src={Poster === 'N/A' ? url : Poster} alt={Title} />
                <div className='movie-info'>
                  <h4 className='title'>{Title}</h4>
                  <p>{Year}</p>
                </div>
              </article>
            </Link>
          )
        })}
      </section>
      {loading && <div className='loading'></div>}
    </>
  )
}

export default Movies
