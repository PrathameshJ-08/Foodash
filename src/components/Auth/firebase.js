import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAX2F2C7EYiPMAKqJ5scgrdLmCcwHSjlYg",
  authDomain: "swiggy-react-auth-bfcac.firebaseapp.com",
  projectId: "swiggy-react-auth-bfcac",
  storageBucket: "swiggy-react-auth-bfcac.appspot.com",
  messagingSenderId: "78657317146",
  appId: "1:78657317146:web:a6acbdd074e38cdbc364a3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
