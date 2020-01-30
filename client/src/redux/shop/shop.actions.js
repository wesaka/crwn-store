import ShopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
});

// THIS IS OLD CODE, BUT I WONT REMOVE IT FOR REASONS OF FUTURE REFERENCE
// Because of redux-thunk (that was passed on as middleware), this function can use dispatch
// And as redux-thunk is enabled, when we try to dispatch a function instead of an object
// the function gets called with dispatch method as first argument

// In this case, we managed to get all the asynchronous fetching data job to redux, not longer tied to the component
// export const fetchCollectionsStartAsync = () => {
//         return dispatch => {
//         // We pass what collection we want to retrieve from firestore, in this case, 'collections'
//         const collectionRef = firestore.collection('collections');
//         dispatch(fetchCollectionsStart());
//
//         collectionRef.get().then(snapshot => {
//             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//             dispatch(fetchCollectionsSuccess(collectionsMap));
//         }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
//     }
// };

