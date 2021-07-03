import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../../core/AppProvider';
import { Link, useRouteMatch } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import Authentication from '../../../../security/Authentication';
import UserServices from '../../../../services/UserServices';

const Users = () => {

    const { id } = Authentication.getProfile();
    const { url } = useRouteMatch();
    const [state, dispatch] = useContext(AppContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(state.users);
    }, [state]);

    const columns = [
        {
            name: 'username',
            selector: 'username'
        },
        {
            name: 'email',
            selector: 'email'
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
    ];

    const confirmDeleteOperation = (data) => {
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
    }

    const deleteUser = async (id) => {
        const response = await UserServices.deleteUser(id);
        if (response.success) {
            const filterUsers = state.users.filter(user => user.id !== id);
            dispatch({ type: 'set_users', data: filterUsers });
            Swal.fire({
                icon: 'success',
                text: 'User deleted!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error deleting the user'
            });
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Users Management</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={`${url}/create`} className="btn btn-sm btn-outline-success sm-btn">create user</Link>
                </div>
            </div>
            <div className="container">
                <DataTable
                    columns={columns}
                    data={users}
                />
            </div>
        </>
    );
}

export default Users;