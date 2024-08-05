
function SearchBar() {

    return (
        <div className="search-bar ">
          <input
            type="text"
            className="form-control"
            placeholder="Search for your item"
          />
        </div>
    )

}

export default SearchBar;

/// i implemented a search bar component so that each page that should not have the nav bar present will be present