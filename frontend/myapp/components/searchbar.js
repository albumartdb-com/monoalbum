import {useState} from 'react'

export default function SearchBar({onSubmit}) {
    const [input, setInput] = useState('')

    return (
        <>
            <form method="get" onSubmit={e => onSubmit(e, {input})}>
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
        </>
    )
}