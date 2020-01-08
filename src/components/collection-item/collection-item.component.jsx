import React from "react";
import { connect } from 'react-redux'

import { addItem } from "../../redux/cart/cart.actions";
import { CollectionItemContainer, Image, CollectionItemButton, CollectionFooterContainer, NameContainer, PriceContainer } from "./collection-item.styles"

// When using Redux, don't forget to add the action to the props
const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
        <CollectionItemContainer>
            <Image imageUrl={imageUrl}/>

            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>{price}</PriceContainer>
            </CollectionFooterContainer>

            { /* That action that is passed through props, must be "activated", in this case here */ }
            <CollectionItemButton inverted onClick={() => addItem(item)}>Add to Cart</CollectionItemButton>
        </CollectionItemContainer>
    )
};

// Map dispatch to props is used to turn
// things into state
// Map state to props is used to turn things into props, to read states
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});


export default connect(null, mapDispatchToProps)(CollectionItem);