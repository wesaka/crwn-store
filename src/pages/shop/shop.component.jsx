import React, {Component} from "react";
import {Route} from 'react-router-dom';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component.jsx";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

// We have access to the match object here because we are using a route component in App.js to arrive here
// Match.path allows us to route to a new page without having to worry about the url so far
class ShopPage extends Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        // We pass what collection we want to retrieve from firestore, in this case, 'collections'
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            convertCollectionsSnapshotToMap(snapshot);
        });
    }

    render() {
        const {match} = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        );
    }
}

export default ShopPage;