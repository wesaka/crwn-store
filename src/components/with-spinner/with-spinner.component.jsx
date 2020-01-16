import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

// This is a higher order component, that wraps some component and in this case, shows it or the loading spinner
const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ) : (
        // This way we can pass everything useful for the other component
        <WrappedComponent {...otherProps}/>
    )
};

export default WithSpinner;