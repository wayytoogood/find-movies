import React from 'react'
import { useGlobalContext } from './context'
const SearchForm = () => {
  const { inputValue, setInputValue, setPage, error, totalResults } =
    useGlobalContext()

  const handleInput = (e) => {
    setInputValue(e.target.value)
    setPage(1)
  }

  return (
    <form className='search-form'>
      <h2>search movies</h2>
      <input
        type='text'
        className='form-input'
        value={inputValue}
        onChange={handleInput}
      />
      {error ? (
        <div className='error'>{error}</div>
      ) : (
        <p style={{ marginTop: '1rem', fontWeight: '500' }}>
          {totalResults} movies have been found
        </p>
      )}
    </form>
  )
}

export default SearchForm
