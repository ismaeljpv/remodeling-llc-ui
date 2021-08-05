import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import Authentication from '../../../security/Authentication';

const Navbar = () => {

    const history = useHistory();
    const { url } = useRouteMatch();

    const signOut = () => {
        Authentication.logOut();
        history.push("/");
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark p-2">

                <Link className="navbar-brand navbar-heading" to="#"><strong>Control Panel</strong></Link>

                <div className="dropdown">
                    <button className="btn mobile-nav-toggle me-2" type="button" id="menuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-list"></i>
                    </button>
                    <ul className="dropdown-menu me-2" aria-labelledby="menuButton">
                        <li><Link className="dropdown-item" to={`${url}`} >Dashboard</Link></li>
                        <li><Link className="dropdown-item" to={`${url}/company`} >Company</Link></li>
                        <li><Link className="dropdown-item" to={`${url}/services`} >Services</Link></li>
                        <li><Link className="dropdown-item" to={`${url}/works`} >Works</Link></li>
                        <li><Link className="dropdown-item" to={`${url}/users`} >Users</Link></li>
                        <li><Link className="dropdown-item" to="/" >Back to home</Link></li>
                        <li><Link to="#" className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="#" onClick={signOut}>Sign Out</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;