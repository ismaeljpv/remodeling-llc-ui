import Team1 from '../../../assets/img/team/team-1.jpg';
import Team2 from '../../../assets/img/team/team-2.jpg';
import Team3 from '../../../assets/img/team/team-3.jpg';
import Team4 from '../../../assets/img/team/team-4.jpg';

const Team = () => {
	return (
		<>
			<section id="team" className="team">
				<div className="container">

					<div className="section-title" data-aos="fade-up">
						<h2>Team</h2>
						<p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
					</div>

					<div className="row">

						<div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up">
							<div className="member">
								<img src={ Team1 } className="img-fluid" alt="" />
								<div className="member-info">
									<div className="member-info-content">
										<h4>Walter White</h4>
										<span>Chief Executive Officer</span>
									</div>
									<div className="social">
										<i className="bi bi-twitter"></i>
										<i className="bi bi-facebook"></i>
										<i className="bi bi-instagram"></i>
										<i className="bi bi-linkedin"></i>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
							<div className="member">
								<img src={ Team2 } className="img-fluid" alt="" />
								<div className="member-info">
									<div className="member-info-content">
										<h4>Sarah Jhonson</h4>
										<span>Product Manager</span>
									</div>
									<div className="social">
										<i className="bi bi-twitter"></i>
										<i className="bi bi-facebook"></i>
										<i className="bi bi-instagram"></i>
										<i className="bi bi-linkedin"></i>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
							<div className="member">
								<img src={ Team3 } className="img-fluid" alt="" />
								<div className="member-info">
									<div className="member-info-content">
										<h4>William Anderson</h4>
										<span>CTO</span>
									</div>
									<div className="social">
										<i className="bi bi-twitter"></i>
										<i className="bi bi-facebook"></i>
										<i className="bi bi-instagram"></i>
										<i className="bi bi-linkedin"></i>
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
							<div className="member">
								<img src={ Team4 } className="img-fluid" alt="" />
								<div className="member-info">
									<div className="member-info-content">
										<h4>Amanda Jepson</h4>
										<span>Accountant</span>
									</div>
									<div className="social">
										<i className="bi bi-twitter"></i>
										<i className="bi bi-facebook"></i>
										<i className="bi bi-instagram"></i>
										<i className="bi bi-linkedin"></i>
									</div>
								</div>
							</div>
						</div>

					</div>

				</div>
			</section>
		</>
	);
}

export default Team;