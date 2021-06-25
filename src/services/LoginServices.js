import Enviroment from '../enviroments/Enviroment';
import Authentication from '../security/Authentication';

const sendedTokenKey = 'SendedToken-llc';
const api = Enviroment.getEnviroment();

const signIn = async (body) => {
  const res = await fetch(api + '/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (res.status === 200) {
    const token = res.headers.get("Authorization");
    Authentication.logIn(token);
  }
};

const sendPasswordToken = async (username) => {
  sessionStorage.removeItem(sendedTokenKey);
  const res = await fetch(api + `/user/password/recovery/${username}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  });
  const data = await res.json();
  if (res.status === 200 && data.success) {
    sessionStorage.setItem(sendedTokenKey, username);
  }
  return data;
}

const passwordChange = async (body) => {
  body.username = sessionStorage.getItem(sendedTokenKey);
  let success = false;
  const res = await fetch(api + '/user/password/change', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (res.status === 200) { 
    sessionStorage.removeItem(sendedTokenKey);
    success = true;
  }
  return { data, success };
}

const LoginService = {
  signIn,
  sendPasswordToken,
  passwordChange
};

export default LoginService;