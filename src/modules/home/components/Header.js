import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<header id="header" className="fixed-top d-flex align-items-center">
				<div className="container d-flex justify-content-between">
					<div className="logo">
						<h1><Link className="navbar-brand" to="/">R-24x7</Link></h1>
					</div>
					<Navbar />
				</div>
			</header>
		</>
	);
}

export default Header;