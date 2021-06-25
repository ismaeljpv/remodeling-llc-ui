
const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container">
                        
                        <a href="/#" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
                        </a>
                        <h1 className="brand"><a href="/#">Maxim</a></h1>
                        
                        <nav className="pull-right nav-collapse collapse">
                            <ul id="menu-main" className="nav">
                                <li><a title="team" href="#about">About</a></li>
                                <li><a title="services" href="#services">Services</a></li>
                                <li><a title="works" href="#works">Works</a></li>
                                <li><a title="blog" href="#blog">Blog</a></li>
                                <li><a title="contact" href="#contact">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;