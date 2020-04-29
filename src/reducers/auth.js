const initialState = {
    userToken: ''
};
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_TOKEN': return {
            ...state,
            userToken: action.payload
        };
        default: return state;
    }
};

export default authReducer;
