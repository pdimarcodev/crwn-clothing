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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // si el usuario no está en el snapshot entonces crea el usuario en la db
    if (!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt, 
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
            
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

 

  


