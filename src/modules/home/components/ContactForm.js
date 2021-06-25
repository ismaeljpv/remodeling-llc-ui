
const ContactForm = () => {
    return (
        <section id="contact" className="section green">
            <div className="container">
                <h4>Get in Touch</h4>
                <p>
                    Reque facer nostro et ius, cu persius mnesarchum disputando eam, clita prompta et mel vidisse phaedrum pri et. Facilisis posidonium ex his. Mutat iudico vis in, mea aeque tamquam scripserit an, mea eu ignota viderer probatus. Lorem legere consetetur ei
                    eum. Sumo aeque assentior te eam, pri nominati posidonium consttuam
                </p>
                <div className="blankdivider30">
                </div>

                <div className="row">
                    <div className="cform" id="contact-form">
                        <form action="post" method="post" className="contactForm">
                            <div className="row">
                            <div className="span6">
									<div className="field your-name form-group">
										<input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
									</div>
									<div className="field your-email form-group">
										<input type="text" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
				
									</div>
									<div className="field subject form-group">
										<input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
										<div className="validation"></div>
									</div>
								</div>
                                <div className="span6">
                                    <div className="field message form-group">
                                        <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                                        <div className="validation"></div>
                                    </div>
                                    <input type="submit" value="Send message" className="btn btn-theme pull-left" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;