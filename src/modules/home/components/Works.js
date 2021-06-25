import WorkImg from "../../../assets/img/works";

const Works = () => {
	return (
		<section id="works" class="section">
			<div class="container clearfix">
				<h4>Our Works</h4>
				<div class="row">
					<div id="filters" class="span12">
						<ul class="clearfix">
							<li>
								<a href="#" data-filter="*" class="active">
									<h5>All</h5>
								</a>
							</li>
							<li>
								<a href="#" data-filter=".web">
									<h5>Web</h5>
								</a>
							</li>
							<li>
								<a href="#" data-filter=".print">
									<h5>Print</h5>
								</a>
							</li>
							<li>
								<a href="#" data-filter=".design">
									<h5>Design</h5>
								</a>
							</li>
							<li>
								<a href="#" data-filter=".photography">
									<h5>Photography</h5>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="row">
					<div class="span12">
						<div id="portfolio-wrap">
							<div class="portfolio-item grid print photography">
								<div class="portfolio">
									<a href={WorkImg.Big} data-pretty="prettyPhoto[gallery1]" class="portfolio-image">
										<img src={WorkImg.Img1} alt="" />
										<div class="portfolio-overlay">
											<div class="thumb-info">
												<h5>Portfolio name</h5>
												<i class="icon-plus icon-2x"></i>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="portfolio-item grid print design web">
								<div class="portfolio">
									<a href={WorkImg.Big} data-pretty="prettyPhoto[gallery1]" class="portfolio-image">
										<img src={WorkImg.Img2} alt="" />
										<div class="portfolio-overlay">
											<div class="thumb-info">
												<h5>Portfolio name</h5>
												<i class="icon-plus icon-2x"></i>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="portfolio-item grid print design">
								<div class="portfolio">
									<a href={WorkImg.Big} data-pretty="prettyPhoto[gallery1]" class="portfolio-image">
										<img src={WorkImg.Img3} alt="" />
										<div class="portfolio-overlay">
											<div class="thumb-info">
												<h5>Portfolio name</h5>
												<i class="icon-plus icon-2x"></i>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="portfolio-item grid photography web">
								<div class="portfolio">
									<a href={WorkImg.Big} data-pretty="prettyPhoto[gallery1]" class="portfolio-image">
										<img src={WorkImg.Img4} alt="" />
										<div class="portfolio-overlay">
											<div class="thumb-info">
												<h5>Portfolio name</h5>
												<i class="icon-plus icon-2x"></i>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="portfolio-item grid photography web">
								<div class="portfolio">
									<a href={WorkImg.Big} data-pretty="prettyPhoto[gallery1]" class="portfolio-image">
										<img src={WorkImg.Img5} alt="" />
										<div class="portfolio-overlay">
											<div class="thumb-info">
												<h5>Portfolio name</h5>
												<i class="icon-plus icon-2x"></i>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="portfolio-item grid photography web">
								<div class="portfolio">
									<a href={WorkImg.Big} data-pretty="prettyPhoto[gallery1]" class="portfolio-image">
										<img src={WorkImg.Img6} alt="" />
										<div class="portfolio-overlay">
											<div class="thumb-info">
												<h5>Portfolio name</h5>
												<i class="icon-plus icon-2x"></i>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="portfolio-item grid photography web">
								<div class="portfolio">
									<a href={WorkImg.Big} data-pretty="prettyPhoto[gallery1]" class="portfolio-image">
										<img src={WorkImg.Img7} alt="" />
										<div class="portfolio-overlay">
											<div class="thumb-info">
												<h5>Portfolio name</h5>
												<i class="icon-plus icon-2x"></i>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div class="portfolio-item grid photography">
								<div class="portfolio">
									<a href={WorkImg.Big} data-pretty="prettyPhoto[gallery1]" class="portfolio-image">
										<img src={WorkImg.Img8} alt="" />
										<div class="portfolio-overlay">
											<div class="thumb-info">
												<h5>Portfolio name</h5>
												<i class="icon-plus icon-2x"></i>
											</div>
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Works;