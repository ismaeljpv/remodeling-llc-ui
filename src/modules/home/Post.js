import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Layout from './Layout';
import DynamicImage from './components/DynamicImage';
// import Swiper bundle with all modules installed
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper/core';
//Services
import WorkServices from '../../services/WorkServices';
import EvidenceServices from '../../services/EvidenceServices';

// install Swiper modules
SwiperCore.use([Navigation]);

const Post = () => {

    const { id } = useParams();
    const [work, setWork] = useState(null);
    const [evidences, setEvidences] = useState([]);

    useEffect(() => {
        const getWorkById = async id => {
            const response = await WorkServices.getWorkById(id);
            if (response.success) {
                setWork(response.data);
            }
        }

        const getAllEvidenceByPost = async id => {
            const response = await EvidenceServices.getAllEvidenceByPost(id);
            if (response.success) {
                setEvidences(response.data);
            }
        }

        getWorkById(parseInt(id));
        getAllEvidenceByPost(parseInt(id));
    }, [id]);

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
                        {(work) ? (
                            <>
                                <div className="container">

                                    <div className="row gy-4">

                                        <div className="col-lg-8">
                                           <div className="d-flex me-lg-5">
                                           {(evidences.length > 0) ?
                                                <>
                                                    <Swiper navigation={true}>
                                                        {evidences.map(evidence => (
                                                            <SwiperSlide key={evidence.id} >
                                                                {(evidence.type === 'PICTURE') ?
                                                                    (<DynamicImage id={evidence.id} className="img-fluid" type="POSTS" />)
                                                                    : (<iframe width="600" height="400"
                                                                        src={`https://www.youtube.com/embed/${evidence.videoId}`}
                                                                        title={`video-${evidence.id}`} frameborder="0"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowfullscreen></iframe>)}
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </>
                                                : <></>}
                                           </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div className="portfolio-info">
                                                <h3>Project information</h3>
                                                <ul>
                                                    <li>
                                                        <strong>Categories</strong>:
                                                        <div>
                                                            {work.tags.map((t, i) =>
                                                                <span key={i} className="badge rounded-pill bg-primary me-1" >{t}</span>
                                                            )}
                                                        </div>
                                                    </li>
                                                    { !work.subcontract ? (
                                                        <li><strong>Client</strong>: {work.client}</li>
                                                    ) 
                                                    : (<></>) }
                                                    <li><strong>Project Date</strong>: {moment(work.projectDate).format('DD/MM/YYYY')}</li>
                                                </ul>
                                            </div>
                                            <div className="portfolio-info">
                                                <h3>Description</h3>
                                                <p>
                                                    {work.description}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </>
                        ) : (<></>)}
                    </section>

                </div>
            </Layout>
        </>
    );
}

export default Post;