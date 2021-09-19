// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/database';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: 'AIzaSyBL7_C48_5DuMjMJ1eDRx_xxeB_L-S5-H4',
    authDomain: 'gmt-assignment.firebaseapp.com',
    databaseURL: 'https://gmt-assignment-default-rtdb.firebaseio.com/',
    projectId: 'gmt-assignment',
    storageBucket: 'gmt-assignment.appspot.com',
    messagingSenderId: '532049500680',
    appId: '1:532049500680:web:e0955543b3ace7e6c64fbd',
    measurementId: 'G-922B5JWL94',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize database
const database = firebase.database();

export default { app, database };
