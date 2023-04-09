// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX-hTfiVBTsVotB1zc2_waJ8sCLNaMNpk",
  authDomain: "telo-35b09.firebaseapp.com",
  databaseURL: "https://telo-35b09-default-rtdb.firebaseio.com",
  projectId: "telo-35b09",
  storageBucket: "telo-35b09.appspot.com",
  messagingSenderId: "489798828879",
  appId: "1:489798828879:web:53602b62e7adb2ffe33b3a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);