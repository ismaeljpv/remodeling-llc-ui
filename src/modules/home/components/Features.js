import features1 from '../../../assets/img/features-1.png';
import features2 from '../../../assets/img/features-2.png';
import features3 from '../../../assets/img/features-3.png';
import features4 from '../../../assets/img/features-4.png';


const Features = () => {
    return (
        <>
            <section id="features" className="features">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-4 mb-5 mb-lg-0" data-aos="fade-right">
                            <ul className="nav nav-tabs flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active show" data-bs-toggle="tab" href="#tab-1">
                                        <h4>Safety</h4>
                                        <p>In our business, safety is everything, therefore all our employees follow 
                                            the safety standards required in the different work areas.</p>
                                    </a>
                                </li>
                                <li className="nav-item mt-2">
                                    <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                                        <h4>Licenses</h4>
                                        <p>We got all our licenses in order to satisfy any legal requirement.</p>
                                    </a>
                                </li>
                                <li className="nav-item mt-2">
                                    <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                                        <h4>Time Lines</h4>
                                        <p>We ensure compliance with the delivery times promised in the planning phase.</p>
                                    </a>
                                </li>
                                <li className="nav-item mt-2">
                                    <a className="nav-link" data-bs-toggle="tab" href="#tab-4">
                                        <h4>Quality</h4>
                                        <p>We adjust to the budget of our clients always maintaining the quality of our construction materials</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-7 ml-auto" data-aos="fade-left">
                            <div className="tab-content">
                                <div className="tab-pane active show" id="tab-1">
                                    <figure>
                                        <img src={ features1 } alt="" className="img-fluid" />
                                    </figure>
                                </div>
                                <div className="tab-pane" id="tab-2">
                                    <figure>
                                        <img src={ features2 } alt="" className="img-fluid" />
                                    </figure>
                                </div>
                                <div className="tab-pane" id="tab-3">
                                    <figure>
                                        <img src={ features3 } alt="" className="img-fluid" />
                                    </figure>
                                </div>
                                <div className="tab-pane" id="tab-4">
                                    <figure>
                                        <img src={ features4 } alt="" className="img-fluid" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default Features;