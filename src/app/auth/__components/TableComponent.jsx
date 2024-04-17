import React, { useState, useEffect, useCallback } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import {Tooltip} from "@nextui-org/tooltip";
import {EyeIcon} from "./EyeIcon";
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/pagination";
import {useAsyncList} from "@react-stately/table";
import axios  from 'axios';

export default function App(userData) {
    console.log(userData);
    const [role, setRole] = useState(userData.userData.role_id);
    const [rows, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                axios.defaults.headers.common['Content-Type'] = 'application/json';
                const response = await axios.get('http://localhost/api/user');
                response.data.users.forEach((user) => {
                    // primera en mayusculas
                    user.role_name = user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1);
                    user.created_at = new Date(user.created_at).toLocaleDateString();
                    if(role === 1){
                        user.actions = '';
                    }
                });
                setList(response.data.users);
            }catch(error){
                console.error(error);
            }
        };
        fetchData(); // Call the function to fetch data on component mount
    },[]);
    

    let columns = [
        {key: "id", label: "ID"},
        {key: "name", label: "Nombre"},
        {key: "lastname", label: "Apellido"},
        {key: "email", label: "Correo"},
        {key: "role_name", label: "Rol"},
        {key: "created_at", label: "Creado"},
      ];
      if(role === 1){
          columns.push({key: "actions", label: "Acciones"});
      }


    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(rows.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return rows.slice(start, end);
    }, [page, rows]);

    const renderCell = useCallback((item,columnKey) => {
        if(columnKey === 'actions'){
            return (
                <>
                    <div className="flex">
                        {/* on hover professional styling */}
                        <EyeIcon width="30px" height="30px" className="mr-2 hover:text-blue-500 cursor-pointer"/> {/* on hover professional styling */}
                        
                        <EditIcon width="30px" height="30px" className="mr-2 hover:text-green-500 cursor-pointer"/> {/* on hover professional styling */}
                
                        <DeleteIcon width="30px" height="30px" color="#e92323bf" className="hover:text-red-500 cursor-pointer"/> {/* on hover professional styling */}
                    </div>
                </>
            );
        }
        return getKeyValue(item, columnKey);
    }
    ,[rows]);

    const classNames = React.useMemo(
        () => ({
         
            td: ['border-b border-gray-200 px-6 py-4 text-left text-sm text-gray-900'],
        }   
    )
    ,[]);


    return (
        <Table aria-label="Example table with dynamic content" className="table-auto w-full" classNames={classNames}>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key} className="text-left px-4 py-2 font-medium">
                        {column.label}
                    </TableColumn>
                )}
                
            </TableHeader>
            <TableBody items={rows} emptyContent={"No hay datos"}>
                {(item, index) => (
                    <TableRow key={item.key} className={`border border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                        {(columnKey) => (
                            <TableCell key={columnKey} className="px-4 py-2">
                                {renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}  
                
            </TableBody>
        </Table>
      );
    }
