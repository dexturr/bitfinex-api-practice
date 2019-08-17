import React, { useEffect } from 'react';
import './App.css';
import { createWsSubscribeToTicker } from './redux/action-creators';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const symbol = 'tBTCUSD';
  // needs a use effect with clean up in the form of unsubscribe
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createWsSubscribeToTicker({ symbol }));
  }, [dispatch, symbol]);

  const ticker = useSelector((state) => {
    const ticker = state
      .subscriptions
      .tickerSubscriptions
      .find(({symbol: ticketSymbol}) => symbol === ticketSymbol);
    return ticker;
  });

  return !(ticker && ticker.data) ? 'loading': 
  <section>
    {ticker.data.bid}
  </section>
}

function App() {
  const { ready } = useSelector((state) => {
    return state.websocket;
  });

  return !ready ? 'Loading' : <Home />;
}

export default App;
