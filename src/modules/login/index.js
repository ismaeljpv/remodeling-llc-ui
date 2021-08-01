import { useState } from 'react';
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import Swal from 'sweetalert2';


const Login = ({ signIn }) => {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [shouldHide, setShouldHide] = useState(true);
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
        setShouldHide(false);
        const response = await signIn({ username, password });
        if (response.success) {
            setUsername('');
            setPassword('');
            setShouldHide(true);
            history.push('/cpanel');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid username and/or password'
            });
            setShouldHide(true);
            return
        }
    }

    return (
        <>
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
                    <div className={(!shouldHide) ? 'is-hidden' : ''}>
                        <Link className="link" to={`${url}/password/recovery`}>Lost your password?</Link>
                        <input type="submit" className="log-btn" value="Login" />
                    </div>
                    <div className={(shouldHide) ? 'is-hidden' : ''}>
                        <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;