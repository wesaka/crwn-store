import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from "./user.types";

import { signInSuccess, signInFailure } from "./user.actions";

import {googleProvider, auth, createUserProfileDocument, getCurrentUser} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        // Now that we have the user, we have to retrieve the snapshot from firebase
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();

        // Put just puts things back on the regular redux flow
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data }));
    } catch (e) {
        yield put(signInFailure(e));
    }
}

// We have to make a function that is going to actually sign in the user with google to be called later
export function* signInWithGoogle() {
    // Let's wrap the API call with a try/catch condition
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(signInFailure(e));
    }
}

// First we need to listen for google sign start than trigger the actual sign in from saga
export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        put(signInFailure(e));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try {
        // The getCurrentUser is that Promise we declared on firebase.utils
        const userAuth = yield getCurrentUser();

        if (!userAuth) return;

        yield getSnapshotFromUserAuth(userAuth);
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession)
    ]);
}