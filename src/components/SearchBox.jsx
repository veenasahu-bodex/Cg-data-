import "./SearchBox.css";
function SearchBox({ search, setSearch }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search district..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBox;