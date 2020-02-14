import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB0TUj27DOsVeu3n0M0G4PieVQOw5jbTok",
    authDomain: "crown-clothing-1f5d3.firebaseapp.com",
    databaseURL: "https://crown-clothing-1f5d3.firebaseio.com",
    projectId: "crown-clothing-1f5d3",
    storageBucket: "crown-clothing-1f5d3.appspot.com",
    messagingSenderId: "181519217896",
    appId: "1:181519217896:web:41b770f8bad10081c4055d",
    measurementId: "G-8MS6DKJZRQ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists) {
      const { displayName, email } = userAuth;
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
  provider.setCustomParameters({ prompt: 'select_account '});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;