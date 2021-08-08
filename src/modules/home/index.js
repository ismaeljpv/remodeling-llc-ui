import { useEffect, useContext } from 'react';
import { AppContext } from '../../core/AppProvider';
import Jumbotron from './components/Jumbotron';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import TrustReasons from './components/TrustReasons';
import ContactForm from './components/ContactForm';
import Layout from './Layout';
// Services
import CompanyServices from '../../services/CompanyServices';
import GoalSevices from '../../services/GoalServices';
import FeatureSevices from '../../services/FeatureServices';
import ServiceSevices from '../../services/ServiceSevices';
import TrustReasonServices from '../../services/TrustReasonServices';

const Home = () => {

    const [, dispatch] = useContext(AppContext);

    useEffect(() => {

        const getCompany = async () => {
            const { success, data } = await CompanyServices.getCompanyInfo();
            if (success) {
                dispatch({ type: 'set_company', data });
            }
        }

        const getGoals = async () => {
            const { success, data } = await GoalSevices.getAllGoals();
            if (success) {
                dispatch({ type: 'set_goals', data });
            }
        }

        const getFeatures = async () => {
            const { success, data } = await FeatureSevices.getAllFeatures();
            if (success) {
                dispatch({ type: 'set_features', data });
            }
        }

        const getServices = async () => {
            const { success, data } = await ServiceSevices.getServices();
            if (success) {
                dispatch({ type: 'set_services', data });
            }
        }

        const getTrustReasons = async () => {
            const { success, data } = await TrustReasonServices.getTrustReasons();
            if (success) {
                dispatch({ type: 'set_trustReasons', data });
            }
        }

        getCompany();
        getGoals();
        getFeatures();
        getServices();
        getTrustReasons();
    }, [dispatch]);

    return (
        <>
            <Layout>
                <Jumbotron />
                <About />
                <Features />
                <Services />
                <Portfolio />
                <TrustReasons />
                <ContactForm />
            </Layout>
        </>
    );
}

export default Home;