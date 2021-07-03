import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const getWorks = async () => {
    const res = await fetch(`${api}/post`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getWorkById = async id => {
    const res = await fetch(`${api}/post/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getWorkThumbnail = async id => {
    const res = await fetch(`${api}/post/thumbnail/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return res;
}

const createWork = async (formData) => {
    const res = await fetch(`${api}/post`, {
        method: 'POST',
        headers: {
            'Authorization': Authentication.getToken()
        },
        body: formData
    });
    const data = await res.json();
    let message = "";
    (data.errors !== undefined) ? message = data.errors[0].defaultMessage : message = data.message;
    return (res.status === 200) ? { success: true, data } : { success: false, message } ;
}

const updateWork = async (formData) => {
    const res = await fetch(`${api}/post`, {
        method: 'PUT',
        headers: {
            'Authorization': Authentication.getToken()
        },
        body: formData
    });
    const data = await res.json();
    let message = "";
    (data.errors !== undefined) ? message = data.errors[0].defaultMessage : message = data.message;
    return (res.status === 200) ? { success: true, data } : { success: false, message } ;
}

const deleteWork = async id => {
    const res = await fetch(`${api}/post/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    return (res.status === 200) ? { success: true } : { success: false } ;
}

const WorkServices = {
    getWorks,
    getWorkById,
    getWorkThumbnail,
    createWork,
    updateWork,
    deleteWork
};

export default WorkServices;