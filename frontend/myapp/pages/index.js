import Head from 'next/head'
import {useState, useEffect, useRef, useCallback} from 'react'
import NavBar from '../components/navbar'
import SearchBar from '../components/searchbar/searchbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [searchVal, setSearchVal] = useState('')

  // Set albums and artists when searchVal is updates through the 
  // searchbar component.
  useEffect(() =>{
    if(!searchVal) {
      setAlbums([])
      setArtists([])
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/?q=${searchVal}`, {
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
  },[searchVal, setSearchVal])

  // Seperate contents of this function into it's own container in the future.
  // Ideally should be one component that can be reused for both album and artist.
  function displayContent() {
    if(searchVal) {
      return (
        <>
          <h5>Artists</h5>
          <ul>
            {Object.entries(artists).slice(0, 5).map(([key, artist]) => {              
              return <li key={artist.id}>{artist.name}</li>
            })}
          </ul>
          <h5>Albums</h5>
          <ul>
            {Object.entries(albums).slice(0, 5).map(([key, album]) => {              
              return <li key={album.id}>{album.name}</li>
            })}
          </ul>
        </>
      )
    }
  }

  const searchContent = displayContent()

  return (
    <div className={styles.container}>
      <Head>
        <title>albumartdb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar/>

      <main className={styles.main}>
        <SearchBar
          setSearchVal={setSearchVal}
        />
        {searchContent}
      </main>
    </div>
  )
}
