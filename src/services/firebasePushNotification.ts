// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APPPID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export async function requestMsgPermissions(
  setNotification: (fcm: string, notification: boolean) => void
) {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("got permission");
    const token = await getToken(messaging, {
      vapidKey:
        "BPP4-bY6B6DKN_KKh2Pvc8LvG_klxhiRik0ha-nWwbeTHNkBR2NydZyTCl5Ht-arPpsIe98nyzoe9E5sJzbM93Y",
    });
    console.log("token : ", token);
    setNotification(token, true);
    return token;
  } else {
    setNotification(undefined, false);
    return;
  }
}
