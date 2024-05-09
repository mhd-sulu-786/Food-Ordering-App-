// adminReducer.js

const initialState = {
    orderHistory: [],
  };
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEND_ORDER_TO_ADMIN':
        return {
          ...state,
          orderHistory: [...state.orderHistory, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  