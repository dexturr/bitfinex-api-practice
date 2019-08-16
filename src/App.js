import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createConnectToWebsocket } from './redux/action-creators';

function App() {
  const dispatch = useDispatch();
  dispatch(createConnectToWebsocket({ abc: 'easy as 123'}));

  return (
    <div className="App">
    </div>
  );
}

export default App;
