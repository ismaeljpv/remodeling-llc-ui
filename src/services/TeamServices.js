import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const getTeam = async () => {
    const res = await fetch(`${api}/team`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false } ;
}

const getTeamMember = async id => {
    const res = await fetch(`${api}/team/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false } ;
}

const getTeamMemberPhoto = async id => {
    const res = await fetch(`${api}/team/photo/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    return res;
}

const createTeamMember = async (body) => {
    const res = await fetch(`${api}/team`, {
        method: 'POST',
        headers: {
            'Authorization': Authentication.getToken()
        },
        body
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const updateTeamMember = async (body) => {
    const res = await fetch(`${api}/team`, {
        method: 'PUT',
        headers: {
            'Authorization': Authentication.getToken()
        },
        body
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const deleteTeamMember = async id => {
    const res = await fetch(`${api}/team/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    return (res.status === 200) ? { success: true } : { success: false } ;
}

const TeamServices = {
    getTeam,
    getTeamMember,
    getTeamMemberPhoto,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
};

export default TeamServices;