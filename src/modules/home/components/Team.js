import { useContext } from 'react';
import { AppContext } from '../../../core/AppProvider';
import DynamicImage from './DynamicImage';

const Team = () => {

	const [state,] = useContext(AppContext);

	return (
		<>
			<section id="team" className="team">
				<div className="container">

					<div className="section-title" data-aos="fade-up">
						<h2>Team</h2>
						<p>You want a change but don't have an idea? Don't worry, we also have a qualified staff to help you design and thus achieve the change you are waiting for.</p>
					</div>

					<div className="row">

						{(state.team.length > 0) ? (
							<>
								{state.team.map(member => (
									<div key={member.id} className="col-xl-4 col-lg-4 col-md-6" data-aos="fade-up">
										<div className="member">
											<DynamicImage id={member.id} type="TEAM" className="img-fluid" alt="" />
											<div className="member-info">
												<div className="member-info-content">
													<h4>{member.name}</h4>
													<span>{member.position}</span>
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

export default Team;