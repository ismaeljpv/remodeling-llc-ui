import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../../../core/AppProvider";
import UserServices from "../../../../services/UserServices";
import Authentication from "../../../../security/Authentication";
import Swal from "sweetalert2";

const UpdateUser = () => {

    const [state, dispatch] = useContext(AppContext);
    const { id } = Authentication.getProfile();
    const history = useHistory();

    const [users, setUsers] = useState(null);
    const [roles, setRoles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [username, setUsername] = useState("");
    const [originalUsername, setOriginalUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);

    useEffect(() => {

        const getUserById = async id => {
            const response = await UserServices.getUserById(id);
            if (response.success) {
                setOriginalUsername(response.data.username);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setStatus(response.data.status)
                setRoles(response.data.roles);
                setIsLoaded(true);
            }
        }

        setUsers(state.users);
        getUserById(id);
    }, [state, id]);

    const togglePasswordVisiblity = () => {
        setShowPassword(showPassword ? false : true);
    };

    const toggleConfirmPasswordVisiblity = () => {
        setConfirmShowPassword(showConfirmPassword ? false : true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                text: 'Password must match'
            });
            return
        }

        const exists = users.find(u => u.username === username);
        if (exists && username !== originalUsername) {
            Swal.fire({
                icon: 'error',
                text: 'Username already exists!'
            });
            return
        }

        let updateUser = {
            id,
            username, 
            firstname,
            lastname,
            password,
            email,
            status,
            roles
        };
        
        const response = await UserServices.updateUser(updateUser);
        if (response.success) {
            let updatedUser = { 
                id: response.data.id,
                username: response.data.username,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                status: response.data.status
            };
            const index = users.findIndex(u => u.id === updatedUser.id);
            users[index] = updatedUser;
            dispatch({ type:'set_users', data:users });
            Swal.fire({
                icon: 'success',
                text: 'User updated successfully!'
            });
            history.push("/cpanel/users");
        } else {
            console.log(response);
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error updating the user'
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/users");
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Update User</h1>
            </div>
            { isLoaded ? (
                <>
                    <div className="container mb-2 ps-2 pe-5 pt-2">
                        <div className="card p-3">
                            <form className="row g-2" onSubmit={onSubmit}>
                                <div className="col-md-6 p-2">
                                    <label htmlFor="firstname" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstname" name="firstname"
                                        value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                                <div className="col-md-6 p-2">
                                    <label htmlFor="lastname" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastname" name="lastname"
                                        value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                </div>
                                <div className="col-md-6 p-2">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username"
                                        value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="col-md-6 p-2">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col-md-6 p-2">
                                    <label htmlFor="password" className="form-label">New Password</label>
                                    <div className="inner-addon right-addon">
                                        <i className="icon bi-eye-fill" onClick={togglePasswordVisiblity} />
                                        <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password"
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 p-2 ">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <div className="inner-addon right-addon">
                                        <i className="icon bi-eye-fill" onClick={toggleConfirmPasswordVisiblity} />
                                        <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirmPassword" name="confirmPassword"
                                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 p-2 center">
                                    <button className="btn btn-outline-primary me-5" type="submit">update</button>
                                    <button className="btn btn-outline-danger ms-5" onClick={cancel}>cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )
                : (<></>)}
        </>
    )
}

export default UpdateUser;