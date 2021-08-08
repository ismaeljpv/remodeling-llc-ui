import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const getTrustReasons = async () => {
    const res = await fetch(`${api}/trustReason`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false } ;
}

const getTrustReasonById = async id => {
    const res = await fetch(`${api}/trustReason/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false } ;
}

const getTrustReasonImage = async id => {
    const res = await fetch(`${api}/trustReason/image/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return res;
}

const createTrustReason = async (body) => {
    const res = await fetch(`${api}/trustReason`, {
        method: 'POST',
        headers: {
            'Authorization': Authentication.getToken()
        },
        body
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const updateTrustReason = async (body) => {
    const res = await fetch(`${api}/trustReason`, {
        method: 'PUT',
        headers: {
            'Authorization': Authentication.getToken()
        },
        body
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const deleteTrustReason = async id => {
    const res = await fetch(`${api}/trustReason/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    return (res.status === 200) ? { success: true } : { success: false } ;
}

const TrustReasonServices = {
    getTrustReasons,
    getTrustReasonById,
    getTrustReasonImage,
    createTrustReason,
    updateTrustReason,
    deleteTrustReason
};

export default TrustReasonServices;