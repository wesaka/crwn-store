import React from "react";
import { connect } from 'react-redux'

import './cart-dropdown.styles.scss'

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            { cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>) }
        </div>
        <CustomButton>CHECKOUT</CustomButton>
    </div>
);


// Map dispatch to props is used to turn things into state
// Map state to props is used to turn things into props, to read states
const mapStateToProps = ({cart: {cartItems}}) => ({
    // This name right here is what is used in props
    cartItems
});

export default connect(mapStateToProps)(CartDropdown);