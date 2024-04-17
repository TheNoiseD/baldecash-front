import React, { useState } from 'react';

const Pagination = ({ data, itemsPerPage, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onChangePage(newPage);
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <div className="text-sm text-gray-500">
        Mostrando {currentPage * itemsPerPage - itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, data.length)} de {data.length} resultados
      </div>
      <div className="flex items-center">
        <button
          className="px-2 py-1 border border-gray-300 text-gray-500 hover:bg-gray-200"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`px-2 py-1 border border-gray-300 text-gray-500 ${
              currentPage === index + 1 ? 'bg-gray-200' : ''
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-2 py-1 border border-gray-300 text-gray-500 hover:bg-gray-200"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pagination;