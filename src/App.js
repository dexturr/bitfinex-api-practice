import React from 'react';
import './App.css';
import { createConnectToWebsocket } from './redux/action-creators';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  dispatch(createConnectToWebsocket({ abc: 'easy as 123'}));

  return (
    <div className="App">
    </div>
  );
}

export default App;
