import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Home, Login, Cpanel, PasswordRecovery } from './modules';
import ProtectedRoute from './security/ProtectedRoute';
import LoginService from './services/LoginServices';
import Authentication from './security/Authentication';

function App() {

  return (
    <Router>
      <>
        <Route path="/"
          component={Home}
          exact
        />

        <Route path="/login"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} render={() =>
                (<Login signIn={LoginService.signIn} />)
              }
                exact />

              <Route path={`${url}/password/recovery`} render={() => !Authentication.isLoggedIn ?
                (<PasswordRecovery
                  sendPasswordToken={LoginService.sendPasswordToken}
                  passwordChange={LoginService.passwordChange} />) :
                (<Redirect to={{ pathname: '/login' }} />)
              }
              />
            </>
          )}
        />

        <ProtectedRoute path="/cpanel"
          component={Cpanel}
        />
      </>
    </Router>
  );
}

export default App;
