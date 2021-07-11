import { Switch, Route, useRouteMatch } from 'react-router-dom';

// Components
import Sidebar from './components/Sidebar';
import Company from './components/Company';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Works from './components/Works';
import Users from './components/Users';
import Services from './components/Services';
import UpdateCompany from './components/Company/UpdateCompany';
import UpdateUser from './components/Users/UpdateUser';
import CreateUser from './components/Users/CreateUser';
import CreateService from './components/Services/CreateService';
import UpdateService from './components/Services/UpdateService';
import CreateWork from './components/Works/CreateWork';
import UpdateWork from './components/Works/UpdateWork';
import ContentManager from './components/Works/ContentManager';
import UploadContent from './components/Works/UploadContent';
import Features from './components/Features';
import CreateFeature from './components/Features/CreateFeature';
import UpdateFeature from './components/Features/UpdateFeature';
import CreateGoal from './components/Company/CreateGoal';
import UpdateGoal from './components/Company/UpdateGoal';

const Cpanel = () => {

    const { url } = useRouteMatch();

    return (
        <>
            <div className="alt-grid">
                <div id="cpanel-navbar">
                    <Navbar />
                </div>
                <div className="row" >
                    <nav id="cpanel-sidebar" className="col-lg-2">
                        <Sidebar />
                    </nav>
                    <main className="col-lg-10 ms-sm-auto px-md-auto">
                        <Switch>
                            <Route path={`${url}`} exact>
                                <Dashboard />
                            </Route>
                            <Route path={`${url}/company`} exact>
                                <Company />
                            </Route>
                            <Route path={`${url}/company/update`}>
                                <UpdateCompany />
                            </Route>
                            <Route path={`${url}/works`} exact>
                                <Works />
                            </Route>
                            <Route path={`${url}/works/create`} >
                                <CreateWork />
                            </Route>
                            <Route path={`${url}/works/:id`} exact>
                                <UpdateWork />
                            </Route>
                            <Route path={`${url}/works/content/:id`} exact>
                                <ContentManager />
                            </Route>
                            <Route path={`${url}/works/upload/:id`} exact>
                                <UploadContent />
                            </Route>
                            <Route path={`${url}/features`} exact>
                                <Features />
                            </Route>
                            <Route path={`${url}/features/create`} >
                                <CreateFeature />
                            </Route>
                            <Route path={`${url}/features/:id`} >
                                <UpdateFeature />
                            </Route>
                            <Route path={`${url}/services`} exact>
                                <Services />
                            </Route>
                            <Route path={`${url}/services/create`}>
                                <CreateService />
                            </Route>
                            <Route path={`${url}/services/:id`} >
                                <UpdateService />
                            </Route>
                            <Route path={`${url}/users`} exact>
                                <Users />
                            </Route>
                            <Route path={`${url}/users/create`}>
                                <CreateUser />
                            </Route>
                            <Route path={`${url}/users/update`}>
                                <UpdateUser />
                            </Route>
                            <Route path={`${url}/goal/create/:companyId`}>
                                <CreateGoal />
                            </Route>
                            <Route path={`${url}/goal/update/:id`}>
                                <UpdateGoal />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </div>

        </>
    );
};

export default Cpanel;