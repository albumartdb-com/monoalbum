import Head from 'next/head'
import {useState, useEffect} from 'react'
import NavBar from '../components/navbar'
import SearchBar from '../components/searchbar/searchbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  // Todo: Make it so it goes to a different page onsubmit. Pass chosen 
  // value up from search_suggestion.js
  function handleSubmit(event, input) {
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
        {/* Remove this line later, just to test the suggestion box positioning*/}
        <h1 className={styles.content}>Test to see if search suggestion covers this up</h1>
      </main>
    </div>
  )
}
