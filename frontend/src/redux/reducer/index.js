//  import handleCart from "./handleCart";
//  import {combineReducers } from "redux" ;

//  const rootreducers = combineReducers({
//     handleCart,
//  })
//     export default rootreducers


// // index.js
// src/redux/reducers.js
import { combineReducers } from 'redux';
import handleCart from './handleCart';
import newSchemaReducer from '../../redux/newSchemaReducer';

const rootReducer = combineReducers({
  handleCart,
  newSchema: newSchemaReducer,
});

export default rootReducer;



