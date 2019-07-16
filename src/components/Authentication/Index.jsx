import React from 'react';
import { withRouter } from 'react-router-dom';
const jwt = require('jsonwebtoken');

// import AuthUserContext from './AuthUserContext';
// import { firebase } from '../../firebase';
// import * as routes from '../../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            if (localStorage.getItem("token") != null) {
                // jwt.decode(localStorage.getItem("token"))
                jwt.verify(localStorage.getItem("token"),'ijk3dp4n',(err, decodedToken) => {
                    if (err || !decodedToken) {
                        localStorage.removeItem("token");
                        this.props.history.push("/login");
                    } else {
                        if (!authCondition(decodedToken)) {
                            this.props.history.push("/login");
                        }
                    }
                });
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