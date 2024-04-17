import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'; // Import Pagination component
import SearchBar from './SearchBar'; // Import SearchBar component
import alertify from 'alertifyjs';
import axios from "./../Axios";

const TableComponent = ({ userData,data }) => {
  alertify.set('notifier','position', 'top-center')
  const[role, setRole] = useState(1);
  // const data = [
  //   { id: 1, name: 'Juan', lastname: 'Perez', email: 'juan@perez.test' },
  //   { id: 2, name: 'Maria', lastname: 'Gomez', email: 'maria@gomez.test' },
  //   { id: 3, name: 'Carlos', lastname: 'Lopez', email: 'carlos@lopez.test'},
  //   { id: 4, name: 'Laura', lastname: 'Gonzalez', email: 'laura@gonzalez.test' },
  //   { id: 5, name: 'Pedro', lastname: 'Rodriguez', email: 'pedro@rodriguez.test' },
  //   { id: 6, name: 'Ana', lastname: 'Martinez', email: 'ana@martinez.test' },
  //   { id: 7, name: 'Luis', lastname: 'Sanchez', email: 'luis@sanchez.test' },
  //   { id: 8, name: 'Sofia', lastname: 'Hernandez', email: 'sofia@hernandez.test' },
  //   { id: 9, name: 'Diego', lastname: 'Lopez', email: 'diego@lopez.test' },
  //   { id: 10, name: 'Carolina', lastname: 'Torres', email: 'carolina@torres.test' },
  //   { id: 11, name: 'Andres', lastname: 'Garcia', email: 'andres@garcia.test' },
  //   { id: 12, name: 'Julia', lastname: 'Fernandez', email: 'julia@fernandez.test' },
  //   { id: 13, name: 'Roberto', lastname: 'Ramirez', email: 'roberto@ramirez.test' },
  //   { id: 14, name: 'Marta', lastname: 'Lopez', email: 'marta@lopez.test' },
  //   { id: 15, name: 'Daniel', lastname: 'Gomez', email: 'daniel@gomez.test' },
  //   { id: 16, name: 'Valeria', lastname: 'Perez', email: 'valeria@perez.test' },
  //   { id: 17, name: 'Javier', lastname: 'Hernandez', email: 'javier@hernandez.test' },
  //   { id: 18, name: 'Lucia', lastname: 'Sanchez', email: 'lucia@sanchez.test' },
  //   { id: 19, name: 'Fernando', lastname: 'Torres', email: 'fernando@torres.test' },
  //   { id: 20, name: 'Sara', lastname: 'Gonzalez', email: 'sara@gonzalez.test' }
  // ];

  const [list, setList] = useState(data);
  setList([]);


  const headers = [{ id: 'ID', name: 'Nombre', lastname: 'Apellido', email: 'Correo'}];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = list.filter((row) => {
    return Object.values(row).some((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof value !== 'string' && value !== null) {
        value = value.toString();
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }else{
        return false;
      }
    });
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleEdit = async(row) => {
      await axios.get(`/user/${row.id}`)
      .then((response) => {
          console.log(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
    }

    const handleDelete = async (row) => {
        await alertify.confirm('Eliminar Usuario', '¿Está seguro de eliminar el usuario?', () => {
          axios.delete(`/user/${row.id}`)
          .then((response) => {
              console.log(response.data);
          })
          .catch((error) => {
              console.log(error);
          });
          
          setList(list.filter((item) => item.id !== row.id));
          alertify.success('Usuario eliminado');
        }, () => {
            alertify.error('Cancelado');
        });
    }

  return (
    <div className="container mx-auto">
      <SearchBar data={list} onChangeSearch={handleSearchChange} /> {/* Add SearchBar */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            {Object.values(headers[0]).map((value) => (
              <th
                key={value}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                {value}
              </th>
            ))}
            {role === 1 && (
              <th
                  key="actions"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                  style={{ width: '250px' }}
              >
                  Acciones
            </th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              {Object.values(row).map((value) => (
                <td key={value} className="px-6 py-4 text-left text-sm text-gray-900 border-b border-gray-200">
                  {value}
                </td>
              ))}
              {role === 1 && (
                  <td key="actions" className="px-6 py-4 text-left text-sm text-gray-900 border-b border-gray-200">
                      <button onClick={() => handleEdit(row)}
                          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Editar
                      </button>
                      <button onClick={() => handleDelete(row)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          Eliminar
                      </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        data={filteredData}
        itemsPerPage={itemsPerPage}
        onChangePage={handlePageChange}
      />
    </div>
  );
  
};

export default TableComponent;