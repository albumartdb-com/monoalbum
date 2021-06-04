export default function SearchBar() {
    return (
        <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search monoalbum</span>
            </label>
            <input
                type="text"
                placeholder="Search monoalbum"
                name="s"
            />
            <button type="submit">Search</button>
        </form>
    )
}