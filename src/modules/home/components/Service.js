import Icons from '../../../assets/img/icons';


const Service = () => {
    return (
        <section id="services" className="section green">
            <div className="container">
                <h4>Services</h4>
                <div className="row">
                    <div className="span3 animated-fast flyIn">
                        <div className="service-box">
                            <img src={Icons.laptop} alt="" />
                            <h2>Web design</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div className="span3 animated flyIn">
                        <div className="service-box">
                            <img src={Icons.lab} alt="" />
                            <h2>Web development</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div className="span3 animated-fast flyIn">
                        <div className="service-box">
                            <img src={Icons.camera} alt="" />
                            <h2>Photography</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div className="span3 animated-slow flyIn">
                        <div className="service-box">
                            <img src={Icons.basket} alt="" />
                            <h2>Ecommerce</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Service;