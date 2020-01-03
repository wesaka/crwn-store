import React from "react";
import { connect } from 'react-redux'

import './collection-item.styles.scss'

import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";

// When using Redux, don't forget to add the action to the props
const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
        <div className='collection-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />

            <div className= 'collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>

            { /* That action that is passed through props, must be "activated", in this case here */ }
            <CustomButton inverted onClick={() => addItem(item)}>Add to Cart</CustomButton>
        </div>
    )
};

// Map dispatch to props is used to turn
// things into state
// Map state to props is used to turn things into props, to read states
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});


export default connect(null, mapDispatchToProps)(CollectionItem);