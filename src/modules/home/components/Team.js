import TeamImages from '../../../assets/img/team';
import Icons from '../../../assets/img/icons';

const Team = () => {
    return (
        <section id="about" className="section">
		<div className="container">
			<h4>Who We Are</h4>
			<div className="row">
				<div className="span4 offset1">
					<div>
						<h2>We live with <strong>creativity</strong></h2>
						<p>
							Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe
							al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores.
						</p>
					</div>
				</div>
				<div className="span6">
					<div className="aligncenter">
						<img src={Icons.creativity} alt="" />
					</div>
				</div>
			</div>
			<div className="row">
				<div className="span2 offset1 flyIn">
					<div className="people">
						<img className="team-thumb img-circle" src={TeamImages.Img1} alt="" />
						<h3>John Doe</h3>
						<p>
							Art director
						</p>
					</div>
				</div>
				<div className="span2 flyIn">
					<div className="people">
						<img className="team-thumb img-circle" src={TeamImages.Img2} alt="" />
						<h3>Mike Doe</h3>
						<p>
							Web developer
						</p>
					</div>
				</div>
				<div className="span2 flyIn">
					<div className="people">
						<img className="team-thumb img-circle" src={TeamImages.Img3} alt="" />
						<h3>Neil Doe</h3>
						<p>
							Web designer
						</p>
					</div>
				</div>
				<div className="span2 flyIn">
					<div className="people">
						<img className="team-thumb img-circle" src={TeamImages.Img4} alt="" />
						<h3>Mark Joe</h3>
						<p>
							UI designer
						</p>
					</div>
				</div>
				<div className="span2 flyIn">
					<div className="people">
						<img className="team-thumb img-circle" src={TeamImages.Img5} alt="" />
						<h3>Stephen B</h3>
						<p>
							Digital imaging
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
}

export default Team;