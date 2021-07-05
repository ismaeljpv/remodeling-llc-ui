import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const ROLE = {
    id: 1,
    role: 'ADMIN',
    status: 'ACTIVE'
}

const getAllUsers = async () => {
    const res = await fetch(`${api}/user`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getUsersPaginated = async (page, size) => {
    const res = await fetch(`${api}/user?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}


const getUserById = async (id) => {
    const res = await fetch(`${api}/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const createUser = async (body) => {
    body.roles = [ROLE];
    const res = await fetch(`${api}/user`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken() 
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    let message = "";
    (data.errors !== undefined) ? message = data.errors[0].defaultMessage : message = data.message;
    return (res.status === 200) ? { success: true, data } : { success: false, message } ;
}

const updateUser = async (body) => {
    const res = await fetch(`${api}/user`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    let message = "";
    (data.errors !== undefined) ? message = data.errors[0].defaultMessage : message = data.message;
    return (res.status === 200) ? { success: true, data } : { success: false, message } ;
}

const deleteUser = async (id) => {
    const res = await fetch(`${api}/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    return (res.status === 200) ? { success: true } : { success: false } ;
}

const UserServices = {
    getAllUsers,
    getUsersPaginated,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default UserServices;