import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const getAllFeatures = async () => {
    const res = await fetch(`${api}/feature`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getFeaturesPaginated = async (page, size) => {
    const res = await fetch(`${api}/feature?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getFeatureById = async id => {
    const res = await fetch(`${api}/feature/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getFeatureImage = async id => {
    const res = await fetch(`${api}/feature/image/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return res;
}

const createFeature = async (formData) => {
    const res = await fetch(`${api}/feature`, {
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

const updateFeature = async (formData) => {
    const res = await fetch(`${api}/feature`, {
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

const deleteFeature = async id => {
    const res = await fetch(`${api}/feature/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    return (res.status === 200) ? { success: true } : { success: false } ;
}

const FeatureSevices = {
    getAllFeatures,
    getFeaturesPaginated,
    getFeatureById,
    getFeatureImage,
    createFeature,
    updateFeature,
    deleteFeature
};

export default FeatureSevices;