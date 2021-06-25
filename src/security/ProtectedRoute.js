import { Route, Redirect } from "react-router-dom";
import Authentication from './Authentication';

const ProtectedRoute = (props) => {
    return (
        <Route
            path={props.path} render={() => Authentication.isAuthenticated() ?
                (<props.component />) :
                (<Redirect to={{ pathname: '/login' }} />)
            }
        />
    );
};

export default ProtectedRoute;