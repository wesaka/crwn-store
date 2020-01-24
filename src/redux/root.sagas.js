import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";

// Having a root saga makes it easier so we can just add in the array the sagas that we want to listen
export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart),
        call(userSagas),
        call(cartSagas)
    ])
}