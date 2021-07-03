import { Route, Redirect } from 'react-router-dom';
import Authentication from '../security/Authentication';

const ProtectedRoute = ({ component: Component,  ...rest }) => {
    return (
        <Route  {...rest} render={(props) => Authentication.isAuthenticated() ?
                (<Component {...props} {...rest} />) :
                (<Redirect to={{ pathname: '/login' }} />)
            }
        />
    );
};

export default ProtectedRoute;