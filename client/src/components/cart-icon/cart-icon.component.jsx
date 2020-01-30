import React from "react";
import {connect} from 'react-redux'

import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";

import {createStructuredSelector} from "reselect";
import {CartIconContainer, ItemCountContainer, ShoppingIconContainer} from "./cart-icon.styles";

// Remember to pass the action as props for the component
const CartIcon = ({toggleCartHidden, itemCount}) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <ShoppingIconContainer className='shopping-icon'/>
        <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())

});

const mapStateToProps = createStructuredSelector({
    // Reduce is kinda like a nested foreach loop to read and sum all the cartItems quantities
    // Again, remember to pass this value as props
    // Here, we are using a selector (Memoized selector provided by reselect), and we have to pass the whole state for it
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);