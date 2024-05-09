// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
// import {Provider} from "react-redux"
// import store from './redux/store'
 
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
 
//    <React.StrictMode> 
//   <Provider store={store}>
//   <App />
//   </Provider>

//   </React.StrictMode> 
 
// );


// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom'; // Import from 'react-dom' instead of 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from 'react-redux'
import store from './redux/store'; // Import your Redux store

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
  
        <App />
      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
