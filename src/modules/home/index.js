import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Spacer from './components/Spacer';
import Team from './components/Team';
import Service from './components/Service';
import Works from './components/Works';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <Spacer content={ <>There's huge space beetween creativity and imagination <cite>Mark Simmons, Nett Media</cite></> } 
                    iconClass={"icon-coffee icon-10x"}
                    sectionClass={"spacer green"} />
            <Team />
            <Service />
            <Works />
            <Blog />
            <Spacer content={"We are an established and trusted web agency with a reputation for commitment and high integrity"} 
                    iconClass={"icon-rocket icon-10x"}
                    sectionClass={"spacer bg3"} />
            <ContactForm />
            <Footer />
        </div>
    );
};

export default Home;