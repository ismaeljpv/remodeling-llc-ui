import { Link, useRouteMatch, useHistory } from "react-router-dom";
import Authentication from "../../../security/Authentication";

const Sidebar = () => {

    const tokenUser = Authentication.getProfile();
    const history = useHistory();
    const { url } = useRouteMatch();

    const signOut = () => {
        Authentication.logOut();
        history.push("/");
    }

    return (
        <>
            <div className="d-flex flex-column sidebar sidebar-sticky p-3 text-white bg-dark cpanel-sidebar">
                <a href="/#" className="d-flex mb-3 mb-md-0 p-1 me-2 text-white text-decoration-none sidebar-heading">
                    <strong className="ms-4">Remodeling LLC</strong>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link to={`${url}`} className="nav-link sidebar-item text-white">
                        <i className="bi me-2 bi-file-bar-graph-fill" width="16" height="16"/>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to={`${url}/company`} className="nav-link sidebar-item text-white">
                        <i className="bi me-2 bi-building" width="16" height="16"/>
                            Company
                        </Link>
                    </li>
                    <li>
                        <Link to={`${url}/services`} className="nav-link sidebar-item text-white">
                        <i className="bi me-2 bi-menu-up" width="16" height="16"/>
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link to={`${url}/works`} className="nav-link sidebar-item text-white">
                        <i className="bi me-2 bi-tools" width="16" height="16"/>
                            Works
                        </Link>
                    </li>
                    <li>
                        <Link to={`${url}/users`} className="nav-link sidebar-item text-white">
                        <i className="bi me-2 bi-person-badge" width="16" height="16"/>
                            Users
                        </Link>
                    </li>
                    <li className="nav-item sidebar-item">
                        <Link to="/" className="nav-link text-white" aria-current="page">
                         <i className="bi me-2 bi-house-door-fill" width="16" height="16"/>
                            Back To Home
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown dropup">
                    <a href="/#" className="nav-link d-flex align-items-center text-white text-decoration-none dropdown-toggle sidebar-item" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" >
                            <i className="bi ms-2 me-2 bi-lock" width="16" height="16"/>
                            <strong>{ tokenUser.username }</strong> 
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to="/cpanel/users/update" >profile</Link></li>
                        <li><Link className="dropdown-item" to="#" onClick={ signOut } >sign out</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;