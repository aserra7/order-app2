// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfP5rzVdrBgk9m2ZWopvbY4PtWVh6fJC4",
    authDomain: "order-app-2b528.firebaseapp.com",
    projectId: "order-app-2b528",
    storageBucket: "order-app-2b528.appspot.com",
    messagingSenderId: "923232478716",
    appId: "1:923232478716:web:24399d3a0ea2aa13773e79",
    measurementId: "G-EGHNDX9LLV"
};

// Initialize Firebase
const connection = initializeApp(firebaseConfig);

export default connection;