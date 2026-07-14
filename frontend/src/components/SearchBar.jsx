import { useState } from "react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="container mt-4">
      <div className="input-group">

        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search books by title or author..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>
    </div>
  );
}

export default SearchBar;