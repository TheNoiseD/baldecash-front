import React, { useState } from 'react';

const SearchBar = ({ data, onChangeSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onChangeSearch(event.target.value);
  };

  return (
    <div className="flex justify-end items-center mb-4"> {/* Apply flexbox for alignment */}
      <input
        type="text"
        placeholder="Buscar..."
        className="w-25 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;