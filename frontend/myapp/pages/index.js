import Head from 'next/head'
import {useState, useEffect} from 'react'
import NavBar from '../components/navbar'
import SearchBar from '../components/searchbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])

  function handleSubmit(event, input) {
      event.preventDefault()
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

  return (
    <div className={styles.container}>
      <Head>
        <title>albumartdb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar/>

      <main className={styles.main}>
        <SearchBar
          onSubmit={handleSubmit}
        />
        <ul>
          {
            Object.entries(albums).slice(0, 10).map(([key, value]) => {
              return <li id={value.id}>{value.name}</li>
            })
          }
        </ul>
        <ul>
          {
            Object.entries(artists).slice(0, 10).map(([key, value]) => {
              return <li id={value.id}>{value.name}</li>
            })
          }
        </ul>
      </main>
    </div>
  )
}
