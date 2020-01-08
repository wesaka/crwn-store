import React from "react";
import { CartText, ItemDetailsContainer, ImageContainer, CartItemContainer } from "./cart-item.styles";

const CartItem = ({item: {imageUrl, price, name, quantity}}) => (
    <CartItemContainer>
        <ImageContainer src={imageUrl} alt='item' />
        <ItemDetailsContainer>
            <CartText>{name}</CartText>
            <CartText>{quantity} x ${price}</CartText>
        </ItemDetailsContainer>
    </CartItemContainer>
);

export default CartItem;