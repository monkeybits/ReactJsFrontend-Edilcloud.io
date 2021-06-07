// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-analytics.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    // apiKey: "AIzaSyDQCSxmCGG_b4-UnkfGSiB91jSNN_5MN-g",
    // authDomain: "edilcloud-testing.firebaseapp.com",
    // projectId: "edilcloud-testing",
    // storageBucket: "edilcloud-testing.appspot.com",
    // messagingSenderId: "918465750682",
    // appId: "1:918465750682:web:e79f3d8207133d1eeee123"
    apiKey: "AIzaSyCdkNCTghgjICWAA3BMXJ8Tiubiu85hGOI",
    authDomain: "edilcloud-66a4c.firebaseapp.com",
    projectId: "edilcloud-66a4c",
    storageBucket: "edilcloud-66a4c.appspot.com",
    messagingSenderId: "234649526371",
    appId: "1:234649526371:web:c0e05fa73c62e7c649d856"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  // console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
