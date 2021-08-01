import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();
const COMPANY_ID = 1;

const getCompanyInfo = async () => {
    const res = await fetch(`${api}/company/${COMPANY_ID}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false } ;
}

const updateCompany = async (body) => {
    const res = await fetch(`${api}/company`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const CompanyServices = {
    getCompanyInfo,
    updateCompany
};

export default CompanyServices;