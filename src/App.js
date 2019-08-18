import React, { useEffect } from 'react';
import './App.css';
import { createWsSubscribeToTicker } from './redux/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import withLoading from './components/loading/with-loading';
import TickerTable from './components/ticker-table/ticker-table';

// const useTickerSubscription = (symbol) => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(createWsSubscribeToTicker({ symbol }));
//   }, [dispatch, symbol]);

//   return useSelector((state) => {
//     const ticker = state
//       .subscriptions
//       .tickerSubscriptions
//       .find(({symbol: ticketSymbol}) => symbol === ticketSymbol);
//     return ticker;
//   });
// }

const Home = () => {
  const symbol = 'tBTCUSD';
  // needs a use effect with clean up in the form of unsubscribe
  // const ticker = useTickerSubscription(symbol);

  return <TickerTable />
}

const LoadingHome = withLoading(Home);

function App() {
  const { ready } = useSelector((state) => {
    return state.websocket;
  });
  
  return <LoadingHome loading={!ready}/>;
}

export default App;
