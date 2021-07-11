import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const getAllEvidenceByPost = async id => {
    const res = await fetch(`${api}/postEvidence?postId=${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data: data.content} : { success: false } ;
}

const getAllEvidenceByPostPaginated = async (id, page, size)=> {
    const res = await fetch(`${api}/postEvidence?postId=${id}&page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data: data} : { success: false } ;
}

const getEvidencePictureById = async id => {
    const res = await fetch(`${api}/postEvidence/picture/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return res;
}

const uploadContent = async (formData) => {
    const res = await fetch(`${api}/postEvidence`, {
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

const deleteEvidence = async id => {
    const res = await fetch(`${api}/postEvidence/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    return (res.status === 200) ? { success: true } : { success: false } ;
}

const EvidenceServices = {
    getAllEvidenceByPost,
    getAllEvidenceByPostPaginated,
    getEvidencePictureById,
    uploadContent,
    deleteEvidence
}

export default EvidenceServices;