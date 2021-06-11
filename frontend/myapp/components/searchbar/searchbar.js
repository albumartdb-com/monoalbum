import {useEffect, useRef, useState} from 'react'
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
  const timeoutRef = useRef(null)

  // Every time input value is changed it will wait 1000ms to call the API.
  // Also clears artists and albums if there is no input value, since the 
  // previous suggestions would show in the suggestion box.
  useEffect(() => {
    if(timeoutRef.current != null)
      clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(()=> {
      timeoutRef.current = null;
      input !== '' ? getData() : null;
    },1000);  

    if(!input) {
      setAlbums([])
      setArtists([])
    }
  }, [input])

  // Requests data from the API. Probably needs to be changed in the future
  function getData() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/?q=${input}`, {
        method: "GET" 
    })
    .then(response => response.json())
    .then(data => {
      setAlbums(data.albums.items)
      setArtists(data.artists.items)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
  }

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
            onChange={e => setInput(e.target.value)}
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
