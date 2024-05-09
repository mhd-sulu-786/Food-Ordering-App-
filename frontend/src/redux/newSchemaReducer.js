const initialState = [];

const newSchemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED_FOOD':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default newSchemaReducer;
