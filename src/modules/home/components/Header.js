import ImgBackground from '../../../assets/img/logo-image.png';

const Header = () => {
    return (
        <div id="header-wrapper" className="header-slider">
		<header className="clearfix">
			<div className="logo">
				<img src={ImgBackground} alt="" />
			</div>
			<div className="container">
				<div className="row">
					<div className="span12">
						<div id="main-flexslider" className="flexslider">
							<ul className="slides">
								<li>
									<p className="home-slide-content">
										<strong>creative</strong> and passion
									</p>
								</li>
								<li>
									<p className="home-slide-content">
										Eat and drink <strong>design</strong>
									</p>
								</li>
								<li>
									<p className="home-slide-content">
										We loves <strong>simplicity</strong>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</header>
	</div>
    );
}

export default Header;