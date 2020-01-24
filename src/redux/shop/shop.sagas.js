import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

// This generator function here is what is going to manage the chain of actions of fetching collections
// This used to be managed and called by redux thunk, but now we're using sagas to do it
export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection('collections');

        // This is very similar to async await
        const snapshot = yield collectionRef.get();

        // We want to yield if the call takes longer than expected, using call to call the function
        // It allows saga to keep the control
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        // Unlike thunk that uses dispatch to generate actions, saga uses put to call an action generator
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (e) {
        yield put(fetchCollectionsFailure(e.message))
    }
}

export function* fetchCollectionsStart() {
    // Basically, this thing here listens to the specific redux actions and fires new functions accordingly
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionAsync);
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}