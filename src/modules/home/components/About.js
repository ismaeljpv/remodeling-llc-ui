import { useContext } from 'react';
import { AppContext } from '../../../core/AppProvider';
import aboutImg2 from '../../../assets/img/about-img2.jpg';

const About = () => {

    const [state,] = useContext(AppContext);

    return (
        <>
            <section id="about" className="about section-bg">
                <div className="container">

                    <div className="row">
                        <div className="col-xl-6 col-lg-7" data-aos="fade-right">
                            <img src={aboutImg2} className="img-fluid" alt="" />
                        </div>
                        <div className="col-xl-6 col-lg-5 pt-5 pt-lg-0">
                            <h3 data-aos="fade-up">Who we are?</h3>
                            <p data-aos="fade-up">
                                {(state.company) ? state.company.description : '24x7 Remodeling LLC'}
                            </p>
                            {(state.goals.length > 0) ? (
                                <>
                                    {state.goals.map(goal => (
                                        <div className="icon-box" data-aos="fade-up" key={goal.id}>
                                            <i className="bx bx-cube-alt"></i>
                                            <h4>{goal.description}</h4>
                                        </div>
                                    ))}
                                </>
                            ) : (<></>)}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default About;