import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter, Route, Switch
  , Redirect
} from "react-router-dom";

import CookieConsent from "react-cookie-consent";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";

import Index from "views/Index.jsx";
import Contribution from "views/contribution/Index.jsx";
import Feed from "views/feed/Index.jsx";
import Register from "views/register/Index.jsx";
import Login from "views/login/Index.jsx";
import Profile from "views/profile/Index.jsx";




import LandingPage from "views/examples/LandingPage.jsx";
import RegisterPage from "views/examples/RegisterPage.jsx";
import ProfilePage from "views/examples/ProfilePage.jsx";

ReactDOM.render(
  <div>
    <CookieConsent
    disableStyles={false}
    location={"bottom"}
    buttonClasses="btn btn-primary"
    containerClasses="alert alert-warning col-lg-12 col-sm-12"
    contentClasses="text-capitalize"
    style={{zIndex:"3"}}
  >
    This website uses cookies to enhance the user experience.
  </CookieConsent>
    <BrowserRouter>
      <Switch>
        <Route path="/components" render={props => <Index {...props} />} />
        <Route path="/landing-page" render={props => <LandingPage {...props} />} />
        <Route path="/register-page" render={props => <RegisterPage {...props} />} />
        <Route path="/profile-page" render={props => <ProfilePage {...props} />} />
        <Route path="/contribution-page" render={props => <Contribution {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/profile" render={props => <Profile {...props} />} />
        <Route path="/" render={props => <Feed {...props} />} />
        {/* <Redirect from="/" to="/components" /> */}
      </Switch>
    </BrowserRouter>
    
  </div>
  ,
  document.getElementById("root")
);
