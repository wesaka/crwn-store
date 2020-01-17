import React, {Component} from "react";
import { Route } from 'react-router-dom';
import { createStructuredSelector } from "reselect";
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component.jsx";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// We have access to the match object here because we are using a route component in App.js to arrive here
// Match.path allows us to route to a new page without having to worry about the url so far
class ShopPage extends Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    // Remember to access the redux function that is being passed on mapDispatchToProps
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    // And here to access the isCollectionFetching prop being passed on mapStateToProps
    render() {
        const { match, isCollectionFetching, isCollectionLoaded } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                       render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>}/>

                {/* We need to pass isCollectionLoaded here because if we refresh the page on the collection*/}
                {/* The app has no reference of the isCollectionFetching, because the collection has been already*/}
                {/* Loaded and a new render has been called, resetting the value for the spinner to be shown*/}
                {/* The spinner only renders if the isLoading is true, and we want to show when there's no collection loaded*/}
                <Route path={`${match.path}/:collectionId`}
                       render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>}/>
            </div>
        );
    }
}

// Here we use a selector to get that single state from redux-thunk
const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);