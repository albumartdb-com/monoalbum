import Dropdown from 'react-bootstrap/Dropdown'
import styles from './search_suggestion.module.css'

/*
  A dropdown showing related albums / artists to the search value.

  Todo:
    - Better formatting for the suggestions (font size, tags for artists, album types etc...)
    - Suggestion box size needs to be fixed
    - Truncate long album titles
    - Add images 
    - Route to different page based on chosen artist or album
*/
export default function SearchSuggestion({albums, artists}) {
  return(
    <div className={styles.container}>

      {/* Albums */}
      <ul className={styles.list_container}>
      {
        Object.entries(albums).slice(0, 5).map(([key1, album]) => {
          return (
            <li className='album' key={album.id}>
              <p className={styles.album_name}>
                {album.name} 
              </p>
              {
                // There can be multiple artists on an Album so in the future
                // we need to either just show the main one or format better to show all
                // or up to a certain number of artists by using .slice()
                Object.entries(album.artists).map(([key2, artist]) => {
                  return (
                      <p className={styles.album_artist} key={artist.id}>{artist.name}</p>
                  )
                })
              }
            </li>
          )
        })
      }
      </ul>
      
      {/* Artists */}
      <ul className={styles.list_container}>
      {
        Object.entries(artists).slice(0, 5).map(([key, artist]) => {
          return <li key={artist.id}>{artist.name}</li>
        })
      }
      </ul>
    </div>
  )
}