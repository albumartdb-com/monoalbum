import {useEffect, useRef, useState} from 'react'
import styles from './searchbar.module.css'

/*
  Main searchbar to let the user search albumartdb either by album or artist

  Todo:
    - Styling
*/
export default function SearchBar({setSearchVal}) {
  const [input, setInput] = useState('')
  const timeoutRef = useRef(null)

  // Set the parent's search value 1 second after the user is
  // done typing.
  useEffect(() => {
    if(timeoutRef.current != null)
      clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(()=> {
      timeoutRef.current = null;
      input !== '' ? setSearchVal(input) : setSearchVal('');
    },500);  
  }, [input, setSearchVal])

  return (
    // Add a search icon in the input bar or next to it
    <div className={styles.container}>
      <label htmlFor="header-search">
          <span className="visually-hidden">Search monoalbum</span>
      </label>
      <input
          autoComplete="off"
          className={styles.input}
          type="text"
          placeholder="Search for albums, artists, singles"
          onChange={e => setInput(e.target.value)}
      />
    </div>
  )
}
