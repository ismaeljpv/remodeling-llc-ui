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
	}, [totalShown]);

	return (
		<>
			<section id="portfolio" className="portfolio section-bg">
				<div className="container">

					<div className="section-title" data-aos="fade-up">
						<h2>Portfolio</h2>
						<p>Check out some of our best works, this could be your house our bussines if you choose us. </p>
					</div>

					<div className="row" >

						{(works.length > 0) ? (
							<>
								{works.map(work => (
									<div key={work.id} className="col-lg-4 col-md-6 portfolio-item" data-aos="fade-up">
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