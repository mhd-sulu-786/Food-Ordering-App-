export const addCart = (food, quantity = 1) => {
    return {
      type: 'ADDITEM',
      payload: { ...food, qty: quantity }, // Include the quantity in the payload
    };
  };
  
  export const delCart = (itemId) => {
    return {
      type: "DELITEM",
      payload: itemId // Pass the ID of the item to be deleted
    };
  };
  
  export const updateStatus = (statuses) => {
    return {
      type: 'UPDATE_STATUS',
      payload: statuses,
    };
};
// action.js
export const addSelectedFood = (food) => {
  return {
    type: 'ADD_SELECTED_FOOD',
    payload: food,
  };
};


// action.js

