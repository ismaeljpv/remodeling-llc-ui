import { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Swal from 'sweetalert2';

const PasswordRecovery = ({ sendPasswordToken, passwordChange }) => {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [isTokenSended, setIsTokenSended] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);

    const togglePasswordVisiblity = () => {
        setShowPassword(showPassword ? false : true);
    };

    const toggleConfirmPasswordVisiblity = () => {
        setConfirmShowPassword(showConfirmPassword ? false : true);
    };

    const sendToken = async (e) => {
        e.preventDefault();
        if (!username) {
            Swal.fire({
                icon: 'info',
                text: 'Please add Username'
            });
            return
        }
        const data = await sendPasswordToken(username);
        const msg = data.message;
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Token Sended!',
                text: msg
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: msg
            })
        }
        setIsTokenSended(data.success);
    }

    const changePassword = async (e) => {
        e.preventDefault();
        if (!password) {
            Swal.fire({
                icon: 'info',
                text: 'Please add new Password'
            });
            return
        }
        if (!confirmPassword) {
            Swal.fire({
                icon: 'info',
                text: 'Please confirm new Password'
            });
            return
        }
        if (confirmPassword !== password) {
            Swal.fire({
                icon: 'info',
                text: 'Passwords must match'
            });
            return
        }
        if (!token) {
            Swal.fire({
                icon: 'info',
                text: 'Please add token'
            });
            return
        }
        const data = await passwordChange({ password, token });
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Password changed successfully!'
            });
            setIsTokenSended(false);
            history.push('/login');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }
    }

    return (
        <div className="login-form" onSubmit={isTokenSended ? changePassword : sendToken} style={{ width: 500 }}>
            <form >
                <h1 className="h1-login">Password Recovery</h1>
                <div className="form-group-login">
                    <p className="h1-login" >We will send you a recovery token to your register email</p>
                </div>
                {isTokenSended ?
                    <>
                        <div className="form-group-login">
                            <input type={showPassword ? "text" : "password"} placeholder="New Password" name="password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className="i-login bi-eye-fill" onClick={togglePasswordVisiblity} />
                        </div>
                        <div className="form-group-login">
                            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <i className="i-login bi-eye-fill" onClick={toggleConfirmPasswordVisiblity} />
                        </div>
                        <div className="form-group-login">
                            <input type="text" placeholder="Insert Your Token " name="token"
                                value={token} onChange={(e) => setToken(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <div className="col-log-6 col-md-6 col-sm-6">
                                <Link to="/login" className="link center" >Back to login</Link>
                            </div>
                            <div className="col-log-6 col-md-6 col-sm-6 ">
                                <Link to="#" className="link center" onClick={() => { setIsTokenSended(false) }} >Resend token</Link>
                            </div>
                        </div>
                    </>
                    :
                    <div className="form-group-login">
                        <input type="text" placeholder="Insert Your Username " name="username"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                }
                <input type="submit" className="log-btn" value={isTokenSended ? "Change Password" : "Send Token"} />
            </form>
        </div>
    );
};

export default PasswordRecovery;