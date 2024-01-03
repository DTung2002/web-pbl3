
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw4ZskFysaUxvrt-enzYHf6FMK-lmexAM",
  authDomain: "otp-phone-57b02.firebaseapp.com",
  projectId: "otp-phone-57b02",
  storageBucket: "otp-phone-57b02.appspot.com",
  messagingSenderId: "842551243127",
  appId: "1:842551243127:web:623af5ca22fab9ebcbb172",
  measurementId: "G-BGXBR82G4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

