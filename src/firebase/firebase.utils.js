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

export const createUserProfileDocument = async (userAuth, displayName, additionalData) => {
    if (!userAuth)
        return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (e) {
            console.log('Error creating user - ', e.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        // By leaving the collectionRef.doc() empty we define that firestore sets us a new unique id
        const newDocRef = collectionRef.doc();

        // And uses that unique id in each object from our "objectsToAdd"
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedColletion = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    // We are already getting the data back from firebase in the correct shape and values
    // Now we need to convert it to the object map that we are going to use in the reducer
    // Here we pass the accumulator (empty in a first moment - the {}) and the item at the current iteration
    return transformedColletion.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;