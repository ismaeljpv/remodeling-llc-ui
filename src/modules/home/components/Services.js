import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../core/AppProvider';
import DynamicImage from './DynamicImage';

const Services = () => {

    const [state,] = useContext(AppContext);
    const [services, setServices] = useState([]);

    useEffect(() => {

        setServices(state.services);
    }, [state]);

    return (
        <>
            <section id="services" className="services section-bg">
                <div className="container">

                    <div className="section-title" data-aos="fade-up">
                        <h1>Services</h1>
                        <p>You want a change but don't have an idea? Don't worry, we also have a qualified staff to help you design and thus achieve the change you are waiting for.</p>
                    </div>

                    <div className="row">
                        {(services.length > 0) ?
                            <>
                                {services.map(service => (
                                    <div key={service.id} className="col-md-6 col-lg-3 d-flex align-items-stretch mb-3 mb-lg-0" data-aos="fade-up">
                                        <div className="card text-center">
                                            <DynamicImage id={service.id} className="card-img-top" type="SERVICES" />
                                            <div className="card-body">
                                                <h5 className="card-title">{service.service}</h5>
                                                <p className="card-text">{service.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                            : (<></>)}
                    </div>
                </div>
            </section>
        </>
    );
};

/* 

 <div key={service.id} className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="fade-up">
                                        <div className="icon-box icon-box-pink">
                                            <div className="icon mb-2"><DynamicImage id={service.id} alt={service.service} className="img-fluid" type="SERVICES" /></div>
                                            <h4 className="title">{service.service}</h4>
                                            <p className="description">{service.description}</p>
                                        </div>
                                    </div>

<div className="card" style="width: 18rem;">
  <img className="card-img-top" src="..." alt="Card image cap">
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

*/

export default Services;