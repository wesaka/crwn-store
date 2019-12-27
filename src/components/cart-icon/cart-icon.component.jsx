import React from "react";
import { connect } from 'react-redux'

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import './cart-icon.styles.scss'

import { ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";

// Remember to pass the action as props for the component
const CartIcon = ({toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())

});

const mapStateToProps = state => ({
    // Reduce is kinda like a nested foreach loop to read and sum all the cartItems quantities
    // Again, remember to pass this value as props
    // Here, we are using a selector (Memoized selector provided by reselect), and we have to pass the whole state for it
    itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);