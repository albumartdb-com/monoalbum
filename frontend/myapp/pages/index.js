import Head from 'next/head'
import {useState, useEffect} from 'react'
import NavBar from '../components/navbar'
import SearchBar from '../components/searchbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [input, setInput] = useState('')

  return (
    <div className={styles.container}>
      <Head>
        <title>albumartdb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar/>

      <main className={styles.main}>
        <SearchBar
        />
      </main>
    </div>
  )
}
