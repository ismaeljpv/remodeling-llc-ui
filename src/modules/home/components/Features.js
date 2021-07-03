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
                                        <h4>Modi sit est</h4>
                                        <p>Quis excepturi porro totam sint earum quo nulla perspiciatis eius.</p>
                                    </a>
                                </li>
                                <li className="nav-item mt-2">
                                    <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                                        <h4>Unde praesentium sed</h4>
                                        <p>Voluptas vel esse repudiandae quo excepturi.</p>
                                    </a>
                                </li>
                                <li className="nav-item mt-2">
                                    <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                                        <h4>Pariatur explicabo vel</h4>
                                        <p>Velit veniam ipsa sit nihil blanditiis mollitia natus.</p>
                                    </a>
                                </li>
                                <li className="nav-item mt-2">
                                    <a className="nav-link" data-bs-toggle="tab" href="#tab-4">
                                        <h4>Nostrum qui quasi</h4>
                                        <p>Ratione hic sapiente nostrum doloremque illum nulla praesentium id</p>
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