import React from 'react';
import './App.css';
import { createWsSubscribeToTicker } from './redux/action-creators';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const symbol = 'tBTCUSD';
  // needs a use effect with clean up in the form of unsubscribe
  const dispatch = useDispatch();
  dispatch(createWsSubscribeToTicker({ symbol }));
  const ticker = useSelector((state) => {
    // console.log(state.tickers);
    const ticker = state.subscriptions.tickerSubscriptions.find(({symbol: ticketSymbol}) => symbol === ticketSymbol);
    const tickerData = state.tickers.find(({ channelId }) => channelId === (ticker && ticker.chanId));
    return tickerData;
  })
  console.log(ticker);
  return (
  <section>
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
