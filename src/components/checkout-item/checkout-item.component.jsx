import React from "react";

import { connect } from 'react-redux'

import { clearAllItems, addItem, removeItem } from "../../redux/cart/cart.actions";

import {CheckoutItemContainer, ImageContainer, ArrowContainer, NamePriceContainer, QuantityContainer, RemoveButtonContainer, ValueContainer} from './checkout-item.styles'

const CheckoutItem = ({cartItem, clearAllItems, addItem, removeItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt='item' />
            </ImageContainer>
            <NamePriceContainer>{name}</NamePriceContainer>
            <QuantityContainer>
                <ArrowContainer onClick={() => removeItem(cartItem)}>&#10094;</ArrowContainer>
                <ValueContainer>{quantity}</ValueContainer>
                <ArrowContainer onClick={() => addItem(cartItem)}>&#10095;</ArrowContainer>
            </QuantityContainer>
            <NamePriceContainer>{price}</NamePriceContainer>
            <RemoveButtonContainer onClick={() => clearAllItems(cartItem)}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    clearAllItems: item => dispatch(clearAllItems(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);