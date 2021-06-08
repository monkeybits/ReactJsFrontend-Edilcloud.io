import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
    // apiKey: "AIzaSyDQCSxmCGG_b4-UnkfGSiB91jSNN_5MN-g",
    // authDomain: "edilcloud-testing.firebaseapp.com",
    // projectId: "edilcloud-testing",
    // storageBucket: "edilcloud-testing.appspot.com",
    // messagingSenderId: "918465750682",
    // appId: "1:918465750682:web:e79f3d8207133d1eeee123",
    // measurementId: "G-ZCZQYCPF4W"
    apiKey: "AIzaSyCdkNCTghgjICWAA3BMXJ8Tiubiu85hGOI",
    authDomain: "edilcloud-66a4c.firebaseapp.com",
    projectId: "edilcloud-66a4c",
    storageBucket: "edilcloud-66a4c.appspot.com",
    messagingSenderId: "234649526371",
    appId: "1:234649526371:web:c0e05fa73c62e7c649d856"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: 'BHRyW3ZRnv9giFMD9DFotLg-TNT0HsH4txDPjhnkQrRc6n_n_PlakUB4hMZdqVWDvsWM3GYhsxlDowYPd8LBCPo'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload)
        });
    });
