import Head from 'next/head'
<<<<<<< HEAD
import {useState, useEffect} from 'react'
import NavBar from '../components/navbar'
=======
>>>>>>> d2ee1acf954c4a92babc4d50472c42e0c5a78d6f
import SearchBar from '../components/searchbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>albumartdb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

<<<<<<< HEAD
      <NavBar/>

=======
>>>>>>> d2ee1acf954c4a92babc4d50472c42e0c5a78d6f
      <main className={styles.main}>
        <SearchBar
        />
      </main>
    </div>
  )
}
