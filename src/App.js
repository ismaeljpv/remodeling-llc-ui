import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Home, Login, Cpanel, PasswordRecovery, Post } from './modules';
import ScrollToTop from './core/ScrollToTop';
import ProtectedRoute from './core/ProtectedRoute';
import { AppProvider } from './core/AppProvider';
import Authentication from './security/Authentication';
import LoginService from './services/LoginServices';

function App() {

  return (
    <Router>
      <>
        <AppProvider>
          <ScrollToTop >

            <Route path='/' render={() => (<Home />)} exact />

            <Route path='/post/:id' component={ Post } exact/>

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

            <ProtectedRoute path='/cpanel' component={ Cpanel } />

          </ScrollToTop>
        </AppProvider>
      </>
    </Router>
  );
}

export default App;
