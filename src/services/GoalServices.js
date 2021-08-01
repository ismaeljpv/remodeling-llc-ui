import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const getAllGoals = async () => {
    const res = await fetch(`${api}/goal`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getGoalsPaginated = async (page, size) => {
    const res = await fetch(`${api}/goal?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const getGoalById = async id => {
    const res = await fetch(`${api}/goal/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const createGoal= async (body) => {
    const res = await fetch(`${api}/goal`, {
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

const updateGoal = async (body) => {
    const res = await fetch(`${api}/goal`, {
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

const deleteGoal = async id => {
    const res = await fetch(`${api}/goal/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    return (res.status === 200) ? { success: true } : { success: false } ;
}

const GoalSevices = {
    getAllGoals,
    getGoalsPaginated,
    getGoalById,
    createGoal,
    updateGoal,
    deleteGoal
};

export default GoalSevices;