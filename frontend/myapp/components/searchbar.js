import {useState} from 'react'

export default function SearchBar() {
    const [input, setInput] = useState('')
    
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:5000/?q=${input}`, {
            method: "GET" 
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error)
        });
    }

    return (
        <form method="get" onSubmit={e => handleSubmit(e)}>
            <label htmlFor="header-search">
                <span className="visually-hidden">Search monoalbum</span>
            </label>
            <input
                type="text"
<<<<<<< HEAD
                placeholder="Search for albums, artists, singles"
=======
                placeholder="Search monoalbum"
>>>>>>> d2ee1acf954c4a92babc4d50472c42e0c5a78d6f
                onChange={e => setInput(e.target.value)}
                value={input}
                name="s"
            />
            <button type="submit">Search</button>
        </form>
    )
}