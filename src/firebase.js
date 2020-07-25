// const firebaseConfig = {
  
// };

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyARlfchJa4E58Tf_9t7C1PpGsZ0BeVTb1I",
  authDomain: "nooragram-clone-react.firebaseapp.com",
  databaseURL: "https://nooragram-clone-react.firebaseio.com",
  projectId: "nooragram-clone-react",
  storageBucket: "nooragram-clone-react.appspot.com",
  messagingSenderId: "744929061790",
  appId: "1:744929061790:web:3cbdc653fd42e492e3c48f",
  measurementId: "G-85653WL5M5"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();

export {db, auth, storage};