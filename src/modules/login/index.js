import { useState } from 'react';
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import Swal from 'sweetalert2';


const Login = ({ signIn }) => {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { url } = useRouteMatch();

    const togglePasswordVisiblity = () => {
        setShowPassword(showPassword ? false : true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
            Swal.fire({
                icon: 'info',
                text: 'Please add Username'
            });
            return
        }
        if (!password) {
            Swal.fire({
                icon: 'info',
                text: 'Please add Password'
            });
            return
        }
        const response = await signIn({ username, password });
        if (response.success) {
            setUsername('');
            setPassword('');
            history.push('/cpanel');
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Invalid username and/or password'
            });
            return
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={onSubmit} >
                <h1 className="h1-login">Login</h1>
                <div className="form-group-login">
                    <input type="text" placeholder="Username " name="username"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group-login">
                    <input type={showPassword ? "text" : "password"} placeholder="Password" name="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="i-login bi-eye-fill" onClick={togglePasswordVisiblity} />
                </div>
                <Link className="link" to={`${url}/password/recovery`}>Lost your password?</Link>
                <input type="submit" className="log-btn" value="Login" />
            </form>
        </div>
    );
};

export default Login;