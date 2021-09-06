import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

// https://www.omdbapi.com/?apikey=68cc0250&s=godfather&page=2

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [displayedOnes, setDisplayedOnes] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)
  const [inputValue, setInputValue] = useState('batman')
  const [error, setError] = useState(false)

  const fetchMovies = async () => {
    setLoading(true)
    let url
    const searchURL = `&s=${inputValue}`
    url = `${API_ENDPOINT}${searchURL}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.Response === 'True') {
        setError(false)
        const uniqueMovies = data.Search.reduce((movies, movie) => {
          const findMovie = movies.find((item) => movie.imdbID === item.imdbID)
          if (findMovie) {
            return [...movies]
          }
          return [...movies, movie]
        }, [])
        setDisplayedOnes(uniqueMovies)
        setTotalResults(data.totalResults)
      } else {
        if (data.Error === 'Incorrect IMDb ID.') {
          setError('No input to search.')
        } else {
          setError(data.Error)
        }
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchMovies()
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [inputValue])

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        displayedOnes,
        setDisplayedOnes,
        inputValue,
        setInputValue,
        totalResults,
        setTotalResults,
        page,
        setPage,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
