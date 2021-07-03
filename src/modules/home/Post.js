import React from 'react';
// import Swiper bundle with all modules installed
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper/core';

import { Link } from 'react-router-dom';

import Layout from './Layout';
import PortafolioDetail1 from '../../assets/img/portfolio/portfolio-details-1.jpg';
import PortafolioDetail2 from '../../assets/img/portfolio/portfolio-details-2.jpg';
import PortafolioDetail3 from '../../assets/img/portfolio/portfolio-details-3.jpg';

// install Swiper modules
SwiperCore.use([Navigation]);

const Post = () => {

    return (
        <>
            <Layout>
                <div className="mt-5">
                    <section className="breadcrumbs ">
                        <div className="container">

                            <div className="d-flex justify-content-between align-items-center">
                                <h2>Portfolio Details</h2>
                                <ol>
                                    <li><Link to="/" >Home</Link></li>
                                    <li>Portfolio Details</li>
                                </ol>
                            </div>

                        </div>
                    </section>
                    <section id="portfolio-details" className="portfolio-details">
                        <div className="container">

                            <div className="row gy-4">

                                <div className="col-lg-8">
                                    <Swiper navigation={true} >
                                        <SwiperSlide>
                                            <img  src={PortafolioDetail1} alt="Detail 1" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img  src={PortafolioDetail2} alt="Detail 3" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                          <img  src={PortafolioDetail3} alt="Detail 3" />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>

                                <div className="col-lg-4">
                                    <div className="portfolio-info">
                                        <h3>Project information</h3>
                                        <ul>
                                            <li><strong>Category</strong>: Web design</li>
                                            <li><strong>Client</strong>: ASU Company</li>
                                            <li><strong>Project date</strong>: 01 March, 2020</li>
                                        </ul>
                                    </div>
                                    <div className="portfolio-description">
                                        <h2>This is an example of portfolio detail</h2>
                                        <p>
                                            Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </section>

                </div>
            </Layout>
        </>
    );
}

export default Post;