import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import { createStore } from 'redux'
import { init } from './websocket/websocket';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
init(store);

ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
