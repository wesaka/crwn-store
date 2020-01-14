import CartActionTypes from "./cart.types";
import {addItemToCart} from "./cart.utils";
import {removeItemFromCart} from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };

        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };

        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            };

        case CartActionTypes.CLEAR_ALL_ITEMS:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
                // Filter returns anything that evaluates to true
                // In our case, we will compare every item in the array for the inequality and return all the items
                // that have a different id in a completely new array of cartItems
            };

        default:
            return state;
    }
};

export default cartReducer;