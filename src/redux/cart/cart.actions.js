import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearAllItems = item => ({
    type: CartActionTypes.CLEAR_ALL_ITEMS,
    payload: item
});


// Actions always have:
// Type, that is what the user is trying to do
// Payload is what the value of the action


