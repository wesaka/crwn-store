import React from "react";
import { connect } from 'react-redux'

import './cart-dropdown.styles.scss'

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";

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
const mapStateToProps = state => ({
    // This name right here is what is used in props
    // We are also using reselect selectors here, so the whole component doesn't need to be re-rendered every time something unrelated to the cart changes in the application
    cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);