import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const getServices = async () => {
    const res = await fetch(`${api}/services`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getServicesPaginated = async (page, size) => {
    const res = await fetch(`${api}/services?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getServicesById = async id => {
    const res = await fetch(`${api}/services/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getServiceThumbnail = async id => {
    const res = await fetch(`${api}/services/thumbnail/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return res;
}

const createService = async (formData) => {
    const res = await fetch(`${api}/services`, {
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

const updateService = async (formData) => {
    const res = await fetch(`${api}/services`, {
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

const deleteService = async id => {
    const res = await fetch(`${api}/services/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    return (res.status === 200) ? { success: true } : { success: false } ;
}

const ServiceSevices = {
    getServices,
    getServicesPaginated,
    getServicesById,
    getServiceThumbnail,
    createService,
    updateService,
    deleteService
};

export default ServiceSevices;