import React from 'react';
import './App.css';
import { createWsSubscribeToTicker } from './redux/action-creators';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch(createWsSubscribeToTicker({ symbol: 'tBTCUSD'}));
  
  return (<section>
    Ready
  </section>)
}

function App() {
  const { ready } = useSelector((state) => {
    return state.websocket;
  });

  return !ready ? 'Loading' : <Home />;
}

export default App;
