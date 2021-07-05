import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../core/AppProvider';
import aboutImg2 from '../../../assets/img/about-img2.jpg';

const About = () => {

    const [state,] = useContext(AppContext);
    const [company, setCompany] = useState(null);

    useEffect(() => {

        setCompany(state.company);
        console.log(company);
    }, [state, company]);

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
                                We are a family business of real estate remodeling that has been working in the community
                                of Madison and its surroundings since 2019.
                            </p>
                            <div className="icon-box" data-aos="fade-up">
                                <i className="bx bx-cube-alt"></i>
                                <h4>Our goal is to achieve excellence with each of our clients through an great quality service and communication</h4>
                                </div>

                            <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                                <i className="bx bx-cube-alt"></i>
                                <h4>We have a qualified and experienced team that is here to serve any remodeling requirement</h4>
                            </div>

                            <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                                <i className="bx bx-cube-alt"></i>
                                <h4>In our business, our clients are our main priority, therefore we will always try to satisfy 
                                    all their needs to achieve success</h4>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default About;