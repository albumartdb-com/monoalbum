import styles from './search_content.module.css'

/*
  Component to display search results. The results are seperated into Artists
  and Albums. The search right now shows the top 5 results for each category.
  Each image should link to the respective artists / album page when clicked.
*/
export default function SearchContent({content, isAlbum=false}) {
  console.log(content)
  return (
    <>
      <ul className={styles.list}>
        {Object.entries(content).slice(0, 5).map(([key, item]) => {              
          return (
            <div key={item.id} className={styles.image_container}>
              <li className={styles.item}>
                <img
                  className={styles.image}
                  src={item.images[0].url} 
                  alt={item.name}
                >
                </img> 
                <div className={styles.info}>
                  <p className={styles.text}>{item.name}</p>
                  {isAlbum
                    ? <p className={styles.text}>By: {item.artists[0].name}</p>
                    : <></>
                  }
                </div>
              </li>
            </div>
          )
        })}
      </ul>
    </>
  )
}