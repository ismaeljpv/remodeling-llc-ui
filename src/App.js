import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Home, Login, Cpanel, PasswordRecovery, Post } from './modules';
import ScrollToTop from './core/ScrollToTop';
import ProtectedRoute from './core/ProtectedRoute';
import { AppProvider } from './core/AppProvider';
import Authentication from './security/Authentication';
import LoginService from './services/LoginServices';
import CompanyService from './services/CompanyServices';

function App() {

  const [company, setCompany] = useState(null);

  useEffect(() => {
  
    const getCompany = async () => {
      const { success, data } = await CompanyService.getCompanyInfo();
      if (success) {
        setCompany(data);
      }
    }

    getCompany();
  }, []);

  return (
    <Router>
      <>
        <AppProvider>
          <ScrollToTop >

            <Route path='/' render={() => (<Home />)} exact />

            <Route path='/post' component={ Post } />

            <Route path='/login'
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} render={() =>
                    (<Login signIn={ LoginService.signIn } />)
                  }
                    exact />

                  <Route path={`${url}/password/recovery`} render={() => !Authentication.isLoggedIn ?
                    (<PasswordRecovery
                      sendPasswordToken={ LoginService.sendPasswordToken }
                      passwordChange={ LoginService.passwordChange } />) :
                    (<Redirect to={ { pathname: '/login' } } />)
                  }
                  />
                </>
              )}
            />

            <ProtectedRoute path='/cpanel' component={ Cpanel } company={ company } />

          </ScrollToTop>
        </AppProvider>
      </>
    </Router>
  );
}

export default App;
