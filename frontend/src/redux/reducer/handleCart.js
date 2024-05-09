// const cart = []
// const handleCart = (state =cart ,action) => {
//     const foods = action.payload;
//     switch (action.type){
//         case "ADDITEM" :
//             const exist =state.find(x=> x.id === foods.id);
//             if(exist){
//                 return state.map((x)=>
//             x.id === foods.id ? {...x , qty :x.qty +1 }: x
//         );
//             } else {
//                 const foods = action.payload;
//                 return[
//                     ...state,{
//                         ...foods,
//                         qty:1,
//                     }
//                 ]
//             }


//             break;

//             case "DELITEM" :
//                 const exist1 = state.find((x)=> x.id === foods.id);
//                 if(exist1.qty === 1){
//                     return state.filter((x)=> x.id !== exist1.id);
//                  } else{
//                     return state.map((x)=> 
//                 x.id === foods.id ? {...x , aty : x.qty-1} : x
//             );
                
//                 }
//                  break;

//             default :
//             return state;
//             break;

//     }

// }
// export default handleCart








//////////////////////////////////////////////

// const initialState = [];

// const handleCart = (state = initialState, action) => {
//     switch (action.type) {
//         case 'ADDITEM':
//             const newItem = action.payload;
//             return [...state, newItem]; // Add the new item to the cart
//         case 'DELITEM':
//             const itemIdToRemove = action.payload.id;
//             return state.filter(item => item.id !== itemIdToRemove); // Remove the item from the cart

//             return state;
    


//         case 'DELITEM':
//             const existingItem = state.find(item => item.id === action.payload.id);
//             if (existingItem.qty === 1) {
//                 // If the item quantity is 1, remove it from the cart
//                 return state.filter(item => item.id !== existingItem.id);
//             } else {
//                 // If the item quantity is greater than 1, decrement its quantity
//                 return state.map(item =>
//                     item.id === existingItem.id ? { ...item, qty: item.qty - 1 } : item
//                 );
//             }
//         default:
//             return state;
//     }
// };

// export default handleCart;

////////////////////////////////////////////////
import { v4 as uuidv4 } from 'uuid';
const initialState = [];



const handleCart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADDITEM':
      const newItem = { ...action.payload, id: uuidv4() }; // Add a unique ID to the item
      return [...state, newItem];
    case 'DELITEM':
      const itemIdToRemove = action.payload;
      return state.filter(item => item.id !== itemIdToRemove);
    default:
      return state;
  }
};
export default handleCart
