import aboutImg from '../../../assets/img/about-img.jpg';


const About = () => {
    return (
        <>
            <section id="about" className="about section-bg">
                <div className="container">

                    <div className="row">
                        <div className="col-xl-6 col-lg-7" data-aos="fade-right">
                            <img src={ aboutImg } className="img-fluid" alt="" />
                        </div>
                        <div className="col-xl-6 col-lg-5 pt-5 pt-lg-0">
                            <h3 data-aos="fade-up">Voluptatem dignissimos provident</h3>
                            <p data-aos="fade-up">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="icon-box" data-aos="fade-up">
                                <i className="bx bx-receipt"></i>
                                <h4>Corporis voluptates sit</h4>
                                <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                            </div>

                            <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                                <i className="bx bx-cube-alt"></i>
                                <h4>Ullamco laboris nisi</h4>
                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                            </div>

                            <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                                <i className="bx bx-cube-alt"></i>
                                <h4>Ullamco laboris nisi</h4>
                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}

export default About;