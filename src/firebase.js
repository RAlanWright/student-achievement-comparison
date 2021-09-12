// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBL7_C48_5DuMjMJ1eDRx_xxeB_L-S5-H4',
    authDomain: 'gmt-assignment.firebaseapp.com',
    projectId: 'gmt-assignment',
    storageBucket: 'gmt-assignment.appspot.com',
    messagingSenderId: '532049500680',
    appId: '1:532049500680:web:e0955543b3ace7e6c64fbd',
    measurementId: 'G-922B5JWL94',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = firebase;
export default firebase;
