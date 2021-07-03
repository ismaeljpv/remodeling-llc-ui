import Jumbotron from './components/Jumbotron';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team'
import ContactForm from './components/ContactForm';
import Layout from './Layout';

const Home = () => {
    return (
        <>
            <Layout>
                <Jumbotron />
                <About />
                <Features />
                <Services />
                <Portfolio />
                <Team />
                <ContactForm />
            </Layout>
        </>
    );
}

export default Home;