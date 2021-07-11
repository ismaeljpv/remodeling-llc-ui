import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DynamicImage from './DynamicImage';

//Services
import WorkServices from '../../../services/WorkServices';


const Portfolio = () => {

	const [works, setWorks] = useState([]);
	const [totalShown, setTotalShown] = useState(6);
	const [totalWorks, setTotalWorks] = useState(0);

	useEffect(() => {

		const getWorkPortafolio = async total => {
			const response = await WorkServices.getWorksPaginated(0, total);
			if (response.success) {
				setWorks(response.data.content);
				setTotalWorks(response.data.totalElements);
			}
		}
		getWorkPortafolio(totalShown);
		console.log("loaded");
	}, [totalShown]);

	return (
		<>
			<section id="portfolio" className="portfolio section-bg">
				<div className="container">

					<div className="section-title" data-aos="fade-up">
						<h2>Portfolio</h2>
						<p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
					</div>

					<div className="row" data-aos="fade-up">

						{(works.length > 0) ? (
							<>
								{works.map(work => (
									<div key={work.id} className="col-lg-4 col-md-6 portfolio-item">
										<div className="portfolio-wrap">
											<DynamicImage id={work.id} className="portfolio-img" type="WORKS" />
											<div className="portfolio-info">
												<h4>{work.title}</h4>
												<div className="portfolio-links">
													<Link to={`/post/${work.id}`} title="More Details"><i className="bx bx-plus"></i></Link>
												</div>
											</div>
										</div>
									</div>
								))}
							</>
						) : (<></>)}

					</div>
					{(totalShown < totalWorks) ? (
						<>
							<div className="text-center load-more">
								<button type="button" onClick={() => (setTotalShown(totalShown + 6))} >Load More</button>
							</div>
						</>
					) : (<></>)}
				</div>
			</section>
		</>
	);
};

export default Portfolio;