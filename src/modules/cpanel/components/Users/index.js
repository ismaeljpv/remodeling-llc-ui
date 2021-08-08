import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import Authentication from '../../../../security/Authentication';
import UserServices from '../../../../services/UserServices';

const Users = () => {

    const { id } = Authentication.getProfile();
    const { url } = useRouteMatch();
    const [users, setUsers] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const getUsers = useCallback(async (page, size = perPage) => {
        const response = await UserServices.getUsersPaginated((page - 1), size);
        if (response.success) {
            setUsers(response.data.content);
            setTotalRows(response.data.totalElements);
        }
    }, [perPage]);


    useEffect(() => {

        getUsers(currentPage);
    }, [getUsers, currentPage]);

    const deleteUser = useCallback(async (id, total = totalRows, page = currentPage) => {
        const response = await UserServices.deleteUser(id);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'User deleted!'
            });
            const filterUsers = users.filter(user => user.id !== id);
            if (filterUsers.length === 0 && page > 1) {
                setCurrentPage(page - 1);
            }
            setUsers(filterUsers);
            setTotalRows(total - 1);
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error deleting the user'
            });
        }
    }, [users, totalRows, currentPage]);

    const confirmDeleteOperation = useCallback((data) => {
        Swal.fire({
            title: 'Are you sure you want to delete this user?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteUser(data.id);
            }
        })
    }, [deleteUser]);

    const columns = useMemo(() => [
        {
            name: 'username',
            selector: 'username'
        },
        {
            name: 'email',
            cell: row => <div data-tag="allowRowEvents">{row.email}</div>
        },
        {
            name: 'Full Name',
            cell: row => <div>{row.firstname} {row.lastname}</div>
        },
        {
            name: 'Status',
            selector: 'status'
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => (row.id === id) ?
                (<Link to={`${url}/update`} className="btn btn-sm btn-outline-primary">update</Link>) :
                (<button type="button" className="btn btn-sm btn-outline-danger" onClick={() => confirmDeleteOperation(row)} >delete</button>)
        }
    ], [confirmDeleteOperation, url, id]);

    const handlePerRowsChange = async (newPerPage, page) => {
        getUsers(page, newPerPage);
        setPerPage(newPerPage);
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2 ms-2">Users Management</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={`${url}/create`} className="btn btn-sm btn-outline-success sm-btn">create user</Link>
                </div>
            </div>
            <div className="container">
                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    paginationServer
                    paginationPerPage={perPage}
                    paginationRowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => (setCurrentPage(page))}
                />
            </div>
        </>
    );
}

export default Users;