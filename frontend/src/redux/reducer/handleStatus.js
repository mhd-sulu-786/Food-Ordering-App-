// reducer.js

const initialState = {
    handleCart: [], // Your initial cart state
    statuses: [], // Initialize statuses array to hold status for each item
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_STATUS':
        return {
          ...state,
          statuses: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  