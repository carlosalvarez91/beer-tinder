// Initialize Cloud Firestore through Firebase
import firebase from 'firebase/app';

export const initializeFirebase = () => firebase.initializeApp({
  apiKey: "AIzaSyCSOwO5tP0XrY7PJyPq8egjb5DZjInCpbQ",
  authDomain: "beer-tinder-23eef.firebaseapp.com",
  projectId: "beer-tinder-23eef",
  storageBucket: "beer-tinder-23eef.appspot.com",
  messagingSenderId: "744657033246",
  appId: "1:744657033246:web:06628a33d29a47d122f60f",
  measurementId: "G-34Q7D583RH"
});

