const initialState = {
    userToken: '',
    userName: '',
    email: '',
    avatar: ''
};
const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_AUTH_DATA':
          const data = action.payload || initialState;
          return {
            ...state,
            ...data
        };
        default: return state;
    }
};

export default authReducer;
