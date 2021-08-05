import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import logoRllc from '../../../assets/img/logo_rllc.png';

const Header = () => {
	return (
		<>
			<header id="header" className="fixed-top d-flex align-items-center">
				<div className="container d-flex justify-content-between">
					<div className="logo">
						<Link to="#"><img src={logoRllc} alt="" width={80} /></Link>
					</div>
					<Navbar />
				</div>
			</header>
		</>
	);
}

export default Header;