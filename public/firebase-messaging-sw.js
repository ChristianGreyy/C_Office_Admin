importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

firebase.initializeApp({
    messagingSenderId: "906861364571",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  var obj = JSON.parse(payload.data.notification);
  var notificationTitle = obj.title;
  var notificationOptions = {
    body: obj.body,
    icon: obj.icon
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
})