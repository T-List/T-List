import React, { useState } from 'react';

const SearchBar = (props) => {
    const { markers } = props;
    console.log(markers)

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    if (searchInput.length) {
        markers.filter((marker) => {
            return marker.clinic.match(searchInput);
        })
    }

    return (
        <div>
            <input
                className='searchBar'
                type="text"
                placeholder='Search for clinics'
                onChange={handleChange}
                value={searchInput}
            />
        </div>
    )
}

export default SearchBar;