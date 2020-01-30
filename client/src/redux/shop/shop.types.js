// At first, we only needed the "UPDATE_COLLECTIONS" type, but with redux thunk we need to set
// multiple states that shop actions could be when fetching async data
const ShopActionTypes = {
    FETCH_COLLECTION_START: 'FETCH_COLLECTION_START',
    FETCH_COLLECTION_SUCCESS: 'FETCH_COLLECTION_SUCCESS',
    FETCH_COLLECTION_FAILURE: 'FETCH_COLLECTION_FAILURE'
};

export default ShopActionTypes;