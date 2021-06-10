import {useState} from 'react'

export default function SearchBar() {
    const [input, setInput] = useState('')
        
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/?q=${input}`, {
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
                placeholder="Search for albums, artists, singles"
                onChange={e => setInput(e.target.value)}
                value={input}
                name="s"
            />
            <button type="submit">Search</button>
        </form>
    )
}