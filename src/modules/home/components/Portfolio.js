import { Link } from 'react-router-dom';

import Portafolio1 from '../../../assets/img/portfolio/portfolio-1.jpg';
import Portafolio2 from '../../../assets/img/portfolio/portfolio-2.jpg';
import Portafolio3 from '../../../assets/img/portfolio/portfolio-3.jpg';
import Portafolio4 from '../../../assets/img/portfolio/portfolio-4.jpg';
import Portafolio5 from '../../../assets/img/portfolio/portfolio-5.jpg';
import Portafolio6 from '../../../assets/img/portfolio/portfolio-6.jpg';
import Portafolio7 from '../../../assets/img/portfolio/portfolio-7.jpg';
import Portafolio8 from '../../../assets/img/portfolio/portfolio-8.jpg';
import Portafolio9 from '../../../assets/img/portfolio/portfolio-9.jpg';


const Portfolio = () => {
	return (
		<>
			<section id="portfolio" className="portfolio section-bg">
				<div className="container">

					<div className="section-title" data-aos="fade-up">
						<h2>Portfolio</h2>
						<p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
					</div>

					<div className="row" data-aos="fade-up">
						<div className="col-lg-12 d-flex justify-content-center">
							<ul id="portfolio-flters">
								<li data-filter="*" className="filter-active">All</li>
								<li data-filter=".filter-app">App</li>
								<li data-filter=".filter-card">Card</li>
								<li data-filter=".filter-web">Web</li>
							</ul>
						</div>
					</div>

					<div className="row portfolio-container" data-aos="fade-up">

						<div className="col-lg-4 col-md-6 portfolio-item filter-app">
							<div className="portfolio-wrap">
								<img src={ Portafolio1 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>App 1</h4>
									<p>App</p>
									<div className="portfolio-links">
										<a href={ Portafolio1 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 1"><i className="bx bx-plus"></i></a>
										<Link to="/post" title="More Details"><i className="bx bx-link"></i></Link>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 portfolio-item filter-web">
							<div className="portfolio-wrap">
								<img src={ Portafolio2 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Web 3</h4>
									<p>Web</p>
									<div className="portfolio-links">
										<a href={ Portafolio2 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="Web 3"><i className="bx bx-plus"></i></a>
										<Link to="/post" title="More Details"><i className="bx bx-link"></i></Link>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 portfolio-item filter-app">
							<div className="portfolio-wrap">
								<img src={ Portafolio3 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>App 2</h4>
									<p>App</p>
									<div className="portfolio-links">
										<a href={ Portafolio3 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 2"><i className="bx bx-plus"></i></a>
										<a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 portfolio-item filter-card">
							<div className="portfolio-wrap">
								<img src={ Portafolio4 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Card 2</h4>
									<p>Card</p>
									<div className="portfolio-links">
										<a href={ Portafolio4 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 2"><i className="bx bx-plus"></i></a>
										<a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 portfolio-item filter-web">
							<div className="portfolio-wrap">
								<img src={ Portafolio5 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Web 2</h4>
									<p>Web</p>
									<div className="portfolio-links">
										<a href={ Portafolio5 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="Web 2"><i className="bx bx-plus"></i></a>
										<a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 portfolio-item filter-app">
							<div className="portfolio-wrap">
								<img src={ Portafolio6 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>App 3</h4>
									<p>App</p>
									<div className="portfolio-links">
										<a href={ Portafolio6 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 3"><i className="bx bx-plus"></i></a>
										<a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 portfolio-item filter-card">
							<div className="portfolio-wrap">
								<img src={ Portafolio7 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Card 1</h4>
									<p>Card</p>
									<div className="portfolio-links">
										<a href={ Portafolio7 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 1"><i className="bx bx-plus"></i></a>
										<a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 portfolio-item filter-card">
							<div className="portfolio-wrap">
								<img src={ Portafolio8 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Card 3</h4>
									<p>Card</p>
									<div className="portfolio-links">
										<a href={ Portafolio8 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="Card 3"><i className="bx bx-plus"></i></a>
										<a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 portfolio-item filter-web">
							<div className="portfolio-wrap">
								<img src={ Portafolio9 } className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Web 3</h4>
									<p>Web</p>
									<div className="portfolio-links">
										<a href={ Portafolio9 } data-gallery="portfolioGallery" className="portfolio-lightbox" title="Web 3"><i className="bx bx-plus"></i></a>
										<a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
									</div>
								</div>
							</div>
						</div>

					</div>

				</div>
			</section>
		</>
	);
};

export default Portfolio;