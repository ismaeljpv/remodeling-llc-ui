import Enviroment from "../enviroments/Enviroment";
import Authentication from "../security/Authentication";

const api = Enviroment.getEnviroment();

const getTablesInfo = async () => {
    const res = await fetch(`${api}/tables/info`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': Authentication.getToken()
        }
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data} : { success: false } ;
}

const DashboardServices = {
    getTablesInfo
}

export default DashboardServices;