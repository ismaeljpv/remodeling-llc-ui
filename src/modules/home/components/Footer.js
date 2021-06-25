
const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="span6 offset3">
                        <ul className="social-networks">
                            <li><a href="/#"><i className="icon-circled icon-bgdark icon-instagram icon-2x"></i></a></li>
                            <li><a href="/#"><i className="icon-circled icon-bgdark icon-twitter icon-2x"></i></a></li>
                            <li><a href="/#"><i className="icon-circled icon-bgdark icon-dribbble icon-2x"></i></a></li>
                            <li><a href="/#"><i className="icon-circled icon-bgdark icon-pinterest icon-2x"></i></a></li>
                        </ul>
                        <p className="copyright">
                            &copy; Remodeling LLC. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;