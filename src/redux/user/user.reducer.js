const INITIAL_STATE = {
    currentUser: null
};

// We pass the INITIAL_STATE as the default value for the state in userReducer
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                // Always spread all the state first, for then setting the desired state
                ...state,
                currentUser: action.payload
            };

        default:
            return state;
    }
};

export default userReducer;