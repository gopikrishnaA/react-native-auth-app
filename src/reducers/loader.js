const initialState = {
  isLoading: false
};
const authReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'SHOW_LOADER': return {
          ...state,
          isLoading: true
      };
      case 'HIDE_LOADER': return {
          ...state,
          isLoading: false
      };
      default: return state;
  }
};

export default authReducer;
