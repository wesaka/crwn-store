import React from "react";
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from "reselect";

import CartItem from "../cart-item/cart-item.component";

import {selectCartItems} from "../../redux/cart/cart.selectors";
import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {CartDropdownContainer, CartItemsContainer, DropdownButton, EmptyMessage} from "./cart-dropdown.styles";


const CartDropdown = ({cartItems, history, dispatch}) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {
                cartItems.length ?
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
                    :
                    <EmptyMessage>Your cart is empty</EmptyMessage>}
        </CartItemsContainer>
        <DropdownButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}>CHECKOUT</DropdownButton>
    </CartDropdownContainer>
);


// Map dispatch to props is used to turn things into state
// Map state to props is used to turn things into props, to read states
const mapStateToProps = createStructuredSelector({
    // This name right here is what is used in props
    // We are also using reselect selectors here, so the whole component doesn't need to be re-rendered every time something unrelated to the cart changes in the application
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));