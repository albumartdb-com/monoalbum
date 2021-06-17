import Head from 'next/head'
import {useState, useEffect} from 'react'
import NavBar from '../components/navbar'
import SearchContent from '../components/search_content' 
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

  function displayContent() {
    if(searchVal) {
      return (
        <>
          <SearchContent content={albums} isAlbum={true}/>
          <SearchContent content={artists}/>
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
        { searchContent }
      </main>
    </div>
  )
}
