import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGpoS_zD0n9wGUssegKX30zemRO6Q0IAg",
  authDomain: "fundsmanager-19b12.firebaseapp.com",
  databaseURL: "https://fundsmanager-19b12-default-rtdb.firebaseio.com",
  projectId: "fundsmanager-19b12",
  storageBucket: "fundsmanager-19b12.appspot.com",
  messagingSenderId: "281405466411",
  appId: "1:281405466411:web:17865e6a4b3f803c1c076e"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
  
const firestore = firebase.firestore();

const auth = firebase.auth();

export { firebase, auth, firestore };
