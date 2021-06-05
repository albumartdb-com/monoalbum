import Head from 'next/head'
import SearchBar from '../components/searchbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>monoalbum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SearchBar
        />
      </main>
    </div>
  )
}
