import { useState } from 'react';
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import Authentication from '../../../security/Authentication';

const Navbar = () => {

	const isAuthenticated = Authentication.isAuthenticated();
	const history = useHistory();
	const { url } = useRouteMatch();
	const [homePage] = useState(url === '/');



	const redirectTo = async (e) => {
		e.preventDefault();
		let ref = e.target.getAttribute('href');

		if (url === '/') {
			await scrollTo(ref);
		}

		if (url === '/post') {
			history.push('/');
		}
	}

	const scrollTo = async (ref) => {

		let header = document.getElementById("header");
		let offset = header.offsetHeight;

		let id = ref.replace("#", "");
		let elementPos = document.getElementById(id).offsetTop;

		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth'
		})
	}

	return (
		<nav id="navbar" className="navbar">
			<ul>
				<li><a className="nav-link scrollto active" href="#hero" onClick={redirectTo}>Home</a></li>
				{homePage ?
					<>
						<li><a className="nav-link scrollto" href="#about" onClick={redirectTo}>About</a></li>
						<li><a className="nav-link scrollto" href="#services" onClick={redirectTo}>Services</a></li>
						<li><a className="nav-link scrollto " href="#portfolio" onClick={redirectTo}>Portfolio</a></li>
						<li><a className="nav-link scrollto" href="#team" onClick={redirectTo}>Team</a></li>
						<li><a className="nav-link scrollto" href="#contact" onClick={redirectTo}>Contact</a></li>

					</> :
					<></>}
				{isAuthenticated ?
					<>
						<li><Link className="nav-link scrollto" to="/cpanel">Admin Panel</Link></li>
					</>
					:
					<></>}
			</ul>
			<div className="dropdown">
				<button className="btn mobile-nav-toggle" type="button" id="menuButton" data-bs-toggle="dropdown" aria-expanded="false">
					<i className="bi bi-list"></i>
				</button>
				<ul className="dropdown-menu" aria-labelledby="menuButton">
					<li><a className="dropdown-item" href="#hero" onClick={redirectTo}>Home</a></li>
					{homePage ?
						<>
							<li><a className="dropdown-item" href="#about" onClick={redirectTo}>About</a></li>
							<li><a className="dropdown-item" href="#services" onClick={redirectTo}>Services</a></li>
							<li><a className="dropdown-item" href="#portfolio" onClick={redirectTo}>Portfolio</a></li>
							<li><a className="dropdown-item" href="#team" onClick={redirectTo}>Team</a></li>
							<li><a className="dropdown-item" href="#contact" onClick={redirectTo}>Contact</a></li>

						</> :
						<></>}
					{isAuthenticated ?
						<>
							<li><Link className="dropdown-item" to="/cpanel">Admin Panel</Link></li>
						</>
						:
						<></>}
				</ul>
			</div>

		</nav>
	);
};

export default Navbar;