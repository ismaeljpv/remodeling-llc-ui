import { useContext } from 'react';
import { AppContext } from '../../../core/AppProvider';
import DynamicImage from './DynamicImage';

const TrustReasons = () => {

	const [state,] = useContext(AppContext);

	return (
		<>
			<section id="trust" className="team">
				<div className="container">

					<div className="section-title" data-aos="fade-up">
						<h2>Why trust us?</h2>
						<p>You want a change but don't have an idea? Don't worry, you can trust our qualified staff to help you design and thus achieve the change you are waiting for.</p>
					</div>

					<div className="row">

						{(state.trustReasons.length > 0) ? (
							<>
								{state.trustReasons.map(reason => (
									<div key={reason.id} className="col-xl-4 col-lg-4 col-md-6" data-aos="fade-up">
										<div className="member">
											<DynamicImage id={reason.id} type="TRUST-REASON" className="reason-img" alt="" />
											<div className="member-info">
												<div className="member-info-content">
													<h4>{reason.title}</h4>
													<span className="me-2 ms-2 mt-2">{reason.description}</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</>
						) : (<></>)}

					</div>

				</div>
			</section>
		</>
	);
}

export default TrustReasons;