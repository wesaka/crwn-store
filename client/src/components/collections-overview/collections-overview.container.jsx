// This container is a higher order component that is going to wrap around everything that needs state
// The purpose of the container is to interact with redux so the component doesn't have to
// The goal of the component itself is to render the component
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

// Here, as we are going to wrap around a component, just name the prop accordingly to what the component is expecting
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

// Compose just wraps around components the same way we are used to, but with the explicit declarations
// It evaluates right to left
const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview);

export default CollectionsOverviewContainer;