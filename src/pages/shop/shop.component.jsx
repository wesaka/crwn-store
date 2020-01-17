import React, {Component} from "react";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
// We have access to the match object here because we are using a route component in App.js to arrive here
// Match.path allows us to route to a new page without having to worry about the url so far
class ShopPage extends Component {
    // Remember to access the redux function that is being passed on mapDispatchToProps
    // The sole purpose of the component is to initialize the start to fetching data and render the components
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    // And here to access the isCollectionFetching prop being passed on mapStateToProps
    render() {
        const { match } = this.props;

        return (
            // Here we swapped the WithSpinner component for the container, as all variables are handled there
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                       component={CollectionsOverviewContainer}/>}/>

                <Route path={`${match.path}/:collectionId`}
                       component={CollectionPageContainer}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);