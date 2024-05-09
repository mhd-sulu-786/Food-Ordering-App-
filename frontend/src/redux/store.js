
import { createStore } from 'redux';

import rootreducers from "./reducer";
const store = createStore(rootreducers);;


export default store
