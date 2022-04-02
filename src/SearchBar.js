
function SearchBar({value,onSearch}) {

    return (
        <div>
            <div className="form-outline mt-2 mb-2">
                <input type="search" id="form1" className="form-control"
                placeholder="Search" onChange={(e) => {onSearch(e.target.value)}} defaultValue={value}/>
            </div>
        </div>
    );

  }
  
  export default SearchBar;



