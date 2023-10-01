// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD8PacImkYSlV6rcAQOI7K51YtzK83j6s",
  authDomain: "practice-auth-6f054.firebaseapp.com",
  projectId: "practice-auth-6f054",
  storageBucket: "practice-auth-6f054.appspot.com",
  messagingSenderId: "255868358624",
  appId: "1:255868358624:web:9b167367d259397331e585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;