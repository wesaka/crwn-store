import { connect } from 'react-redux';
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";

// We do here what we were doing in the shop page component, but handling locally all the changes needed
// Basically here we get the isLoading value from the redux state and pass to the loading wrapper to handle
// The rendering of the spinner component or the page itself

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPage);

export default CollectionPageContainer;