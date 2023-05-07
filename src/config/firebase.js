import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDYdUTjlD4jM-LankA-hsRAbZC2N6XF118",
    authDomain: "lit-social-media-app.firebaseapp.com",
    projectId: "lit-social-media-app",
    storageBucket: "lit-social-media-app.appspot.com",
    messagingSenderId: "1080067363943",
    appId: "1:1080067363943:web:b8e041723f60567bd0b0c2",
    measurementId: "G-0L5KQZ718S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)