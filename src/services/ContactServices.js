import Enviroment from "../enviroments/Enviroment";

const api = Enviroment.getEnviroment();

const sendContactEmail = async (body) => {
    const res = await fetch(`${api}/contact/email`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return (res.status === 200) ? { success: true, data } : { success: false, message: data.message } ;
}

const ContactServices = {
    sendContactEmail
};

export default ContactServices;