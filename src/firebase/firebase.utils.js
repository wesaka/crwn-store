import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCjnCD8NKTHwEIcAbz_x3l2kGQVT7OAUps",
    authDomain: "crwn-db-9eb13.firebaseapp.com",
    databaseURL: "https://crwn-db-9eb13.firebaseio.com",
    projectId: "crwn-db-9eb13",
    storageBucket: "crwn-db-9eb13.appspot.com",
    messagingSenderId: "418191800346",
    appId: "1:418191800346:web:6ff5d28c3d246b9704f9a3"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;