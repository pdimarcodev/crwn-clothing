import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC69P0KnL5GqXWOsNQmsghGw7yREzpN3CM",
    authDomain: "crwn-db-347e4.firebaseapp.com",
    databaseURL: "https://crwn-db-347e4.firebaseio.com",
    projectId: "crwn-db-347e4",
    storageBucket: "crwn-db-347e4.appspot.com",
    messagingSenderId: "563156124787",
    appId: "1:563156124787:web:dd87ae248288da95545606"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

 

  


