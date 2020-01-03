import React from "react";
import { connect } from 'react-redux'

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import './collection.styles.scss'

const CollectionPage = ({ collection }) => {
    const {title, items} = collection;

    return (
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {items.map(item => <CollectionItem key={item.id} item={item}/>)}
        </div>
    </div>
    );
};

// State is the overall reducer state
// ownProps is the own component that we are wrapping the connect props
// REMEMBER: This is where you set the name of the props you are going to pass for the function above
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);