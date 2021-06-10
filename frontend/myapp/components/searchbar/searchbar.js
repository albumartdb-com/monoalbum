import {useState} from 'react'
import SearchSuggestion from './search_suggestion.js'
import styles from './searchbar.module.css'

/*
  Main searchbar to let the user search albumartdb either by album or artist

  Todo:
    - Styling
    - Refer to search_suggestions.js for other stuff
*/
export default function SearchBar({onSubmit}) {
  const [input, setInput] = useState('')
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [isFocused, setFocused] = useState(false)

  // When the input value is changed call the API and populate the album and artist data
  function handleChange(event) {
      event.preventDefault()
      setInput(event.target.value)
      fetch(`http://localhost:5000/?q=${input}`, {
          method: "GET" 
      })
      .then(response => response.json())
      .then(data => {
        setAlbums(data.albums.items)
        setArtists(data.artists.items)
      })
      .catch((error) => {
          console.error('Error:', error)
      });
  }

  // Conditionally render search suggestions when the input field is not an empty string
  // or when the input element is in focus
  function showSuggestions() {
    if(input && isFocused) {
      return (
        <SearchSuggestion
          className={styles.suggestions}
          albums={albums}
          artists={artists}
        />
      )
    }
  }

  const suggestions = showSuggestions()

  return (
    <div className={styles.container}>
      <form 
        method="get" 
        onSubmit={e => onSubmit(e, input)}
        autoComplete="off"
      >
        <label htmlFor="header-search">
            <span className="visually-hidden">Search monoalbum</span>
        </label>
        <input
            className={styles.input}
            type="text"
            placeholder="Search for albums, artists, singles"
            onChange={e => handleChange(e)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={input}
            name="s"
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
      {suggestions}
    </div>
  )
}