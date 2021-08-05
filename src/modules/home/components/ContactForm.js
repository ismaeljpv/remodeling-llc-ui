import { useContext, useState } from 'react';
import { AppContext } from '../../../core/AppProvider';
import ContactServices from '../../../services/ContactServices';
import Validators from '../../../validators';
import Swal from 'sweetalert2';

const ContactForm = () => {

    const [state,] = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        if (name === '') {
            Swal.fire({
                icon: 'error',
                text: 'Name must be set'
            });
            return
        }
        if (email === '') {
            Swal.fire({
                icon: 'error',
                text: 'Email name must be set'
            });
            return
        }

        if (!Validators.isValidEmail(email)) {
            Swal.fire({
                icon: 'error',
                text: 'Invalid Email'
            });
            return
        }

        if (subject === '') {
            Swal.fire({
                icon: 'error',
                text: 'Email subject must be set'
            });
            return
        }
        if (message === '') {
            Swal.fire({
                icon: 'error',
                text: 'Email message must be set'
            });
            return
        }

        if (phoneNumber !== "" && !Validators.isValidPhoneNumber(phoneNumber)) {
            Swal.fire({
                icon: 'error',
                text: 'Invalid Phone Number'
            });
            return
        }


        let contactEmail = {
            name,
            from: email,
            subject,
            message
        };
        if (phoneNumber !== '') {
            contactEmail.phoneNumber = phoneNumber;
        }
        const response = await ContactServices.sendContactEmail(contactEmail);

        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: response.data.message
            });
            return
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops! There was an error sendind the email, please try again later.'
            });
            return
        }
    }

    const redirectToWhatsapp = phoneNumber => {
        let phone = phoneNumber.replace(/[+-]/g, '');
        window.open(`https://wa.me/${phone}`);
    }

    const redirectTo= url => {
        window.open(url);
    }

    return (
        <>
            <section id="contact" className="contact section-bg">
                <div className="container">

                    <div className="section-title" data-aos="fade-up">
                        <h2>Contact</h2>
                        <p>Our estimates are free, for this and many more reasons, do not hesitate to contact us, we are here to serve you.</p>
                    </div>

                    <div className="row no-gutters justify-content-center" data-aos="fade-up">

                        <div className="col-lg-5 d-flex align-items-stretch">
                            <div className="info">
                                <div className="address">
                                    <i className="bi bi-geo-alt"></i>
                                    <h4>Location:</h4>
                                    <p>{(state.company) ? state.company.location : ''}</p>
                                </div>

                                <div className="email mt-4">
                                    <i className="bi bi-envelope"></i>
                                    <h4>Email:</h4>
                                    <p>{(state.company) ? state.company.email : ''}</p>
                                </div>

                                <div className="mt-4 row">
                                    <div className="col phone">
                                        <i className="bi bi-phone"></i>
                                        <div className="green-btn">
                                            <button type="button" onClick={() => redirectToWhatsapp(state.company.phoneNumber)} >Whatsapp</button>
                                        </div>
                                    </div>
                                    <div className="col phone">
                                        <i className="bx bxl-instagram"></i>
                                        <div className="green-btn">
                                            <button type="button" onClick={() => redirectTo('https://www.instagram.com/24x7remodelingllc')} >Instagram</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-5 d-flex align-items-stretch">
                            <iframe title="googlemaps-llc" className="map-iframe"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2917.9240352712445!2d-89.48538098507878!3d43.00093410238092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8807b1f285b776a7%3A0x78b6312a8ae5728f!2s6311%20Quarry%20Vista%20Dr%2C%20Fitchburg%2C%20WI%2053719%2C%20EE.%20UU.!5e0!3m2!1ses!2sve!4v1627850509239!5m2!1ses!2sve"
                                frameBorder="0" allowFullScreen></iframe>
                        </div>

                    </div>

                    <div className="row mt-5 justify-content-center" data-aos="fade-up">
                        <div className="col-lg-10">
                            <form method="post" className="email-form" onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required
                                            value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required
                                            value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input type="text" className="form-control" name="phoneNumber" id="phoneNumber" placeholder="Your Phone Number (Optional)"
                                            value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <textarea className="form-control" name="message" rows="5" placeholder="Message" required
                                        value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your message has been sent. Thank you!</div>
                                </div>
                                <div className="text-center"><button type="submit">Send Message</button></div>
                            </form>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
};

export default ContactForm;