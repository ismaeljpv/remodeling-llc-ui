const validatePassword = async (psw) => {
    if (psw.length < 8) {
        return { isValid: false, msg: "Your password must contain at least 8 characters." }; 
    }
    if (psw.search(/[a-z]/i) < 0) {
        return { isValid: false, msg: "Your password must contain at least one letter." };
    }
    if (psw.search(/[0-9]/) < 0) {
        return { isValid: false, msg: "Your password must contain at least one digit." }; 
    }
    return { isValid: true };
}

const isValidPhoneNumber = (phone) => {
    if (phone.length < 6) return false;
    //eslint-disable-next-line
    return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone);
}

const isValidLength = (value, length) => {
    if (value.search(/[a-z]/i) < 0) {
        return false;
    }
    return value.length > length;
}

const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Validators = {
    validatePassword,
    isValidPhoneNumber,
    isValidLength,
    isValidEmail
}

export default Validators;