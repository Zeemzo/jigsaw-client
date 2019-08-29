import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter, Route, Switch
  // , Redirect
} from "react-router-dom";
// import registerServiceWorker from './registerServiceWorker';

import CookieConsent from "react-cookie-consent";
import { UpdatePushToken, getUserSession } from 'services/UserManagement';

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";
import "assets/css/main.css";

import Contribution from "views/contribution/Index.jsx";
import Home from "views/home/Index.jsx";
import Feed from "views/feed/Index.jsx";

import Register from "views/register/Index.jsx";
import BlockchainAccount from "views/register/BlockchainAccount.jsx";
import Login from "views/login/Index.jsx";
import Profile from "views/profile/Index.jsx";
import View from "views/knowledge/view.jsx";
import Contribute from "views/knowledge/contribution.jsx";
import * as firebase from "firebase/app";
import "firebase/messaging";

ReactDOM.render(
  <div>
    <CookieConsent
      disableStyles={false}
      location={"bottom"}
      buttonClasses="btn btn-primary"
      containerClasses="alert alert-warning col-lg-12 col-sm-12"
      contentClasses="text-capitalize"
      style={{ zIndex: "3" }}
    >
      This website uses cookies to enhance the user experience.
  </CookieConsent>
    <BrowserRouter>
      <Switch>
        <Route path="/create" render={props => <Contribution {...props} />} />
        <Route path="/contribute/:id" render={props => <Contribute {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/wallet" render={props => <Profile {...props} />} />
        <Route path="/blockchainAccount" render={props => <BlockchainAccount {...props} />} />
        <Route path='/knowledge/:id' render={props => <View {...props} />} />
        <Route path='/explore/:key' render={props => <Feed {...props} />} />
        <Route path="/" render={props => <Home {...props} />} />
        {/* <Redirect from="/" to="/components" /> */}
      </Switch>
    </BrowserRouter>

  </div>
  ,
  document.getElementById("root")
);

// registerServiceWorker()


firebase.initializeApp({
  messagingSenderId: "524968000100"
})

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BCuEi9VMw-C4OONcMthQU0jgArm52Dx4z0w2V5FDSC1y5eRM2vKL-f3ph65fZbBB8IIyGMz0yrzSivclkfg0SvI");

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then(async (currentToken) => {
      if (currentToken) {
        console.log(currentToken)
        localStorage.setItem("pushToken", currentToken)
        const user = await getUserSession()
        if (user != null) {
          const res = await UpdatePushToken(user.emailHash, currentToken)
          if (res != null) {
            console.log("token pushed")
          }
        }
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // showToken('Error retrieving Instance ID token. ', err);
      // setTokenSentToServer(false);
    });

    console.log("lol")


  } else {
    console.log('Unable to get permission to notify.');
  }
});

messaging.onTokenRefresh(() => {
  messaging.getToken().then(async (refreshedToken) => {
    console.log(refreshedToken)
    console.log('Token refreshed.');

    localStorage.setItem("pushToken", refreshedToken)

    const user = getUserSession()
    if (user != null) {
      const res = await UpdatePushToken(user.emailHash, refreshedToken)
      if (res != null) {
        console.log("token pushed")
      }
    }
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    // setTokenSentToServer(false);
    // // Send Instance ID token to app server.
    // sendTokenToServer(refreshedToken);
    // ...

  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
    // showToken('Unable to retrieve refreshed token ', err);
  });
});


messaging.onMessage((payload) => {
  console.log('[index.js] Received message ', payload);

  // // Notification.requestPermission(function (result) {
  // //   if (result == 'granted') {
  //     navigator.serviceWorker.ready.then(function (registration) {
  //       registration.showNotification('JIGSAW', {
  //         body: 'You have received assets',
  //         icon: './favicon.ico',
  //         vibrate: [200, 100, 200, 100, 200, 100, 200],
  //         tag: 'assets'
  //       });
  //     });
  //   // }
  // // });
  const notificationTitle = 'Background JIGSAW';
  const notificationOptions = {
    body: 'You have received assets',
    icon: '/favicon.ico'
  };

  return ServiceWorkerRegistration.showNotification(notificationTitle,
    notificationOptions);
})


