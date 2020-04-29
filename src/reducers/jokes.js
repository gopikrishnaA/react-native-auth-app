const initialState = {
  item: {},
  refreshing: false,
  summary: [],
  commentText: '',
  comments: []
};
const jokesReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'UPDATE_JOKES': return {
          ...state,
          ...action.payload
      };
      default: return state;
  }
};

export default jokesReducer;
