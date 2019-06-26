import React from 'react';
import { withRouter } from 'react-router-dom';

// import AuthUserContext from './AuthUserContext';
// import { firebase } from '../../firebase';
// import * as routes from '../../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            if (localStorage.getItem("user") != null) {
                if (!authCondition(localStorage.getItem("user"))) {
                    this.props.history.push("/login");
                }
            }
            else {
                this.props.history.push("/login");
            }
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    }

    return withRouter(WithAuthorization);
}

export default withAuthorization;