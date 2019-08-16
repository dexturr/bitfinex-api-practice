import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { w3cwebsocket } from 'websocket';

const handleUpdate = (message) => {
  // Find the appropriate market this update pertains to

  // Dispatch relavent actions
}

const handleMessage = (message) => {
  switch (message.event) {
    case 'subscribed':  
      console.log(message);      
      break;
    case 'unsubscribed':    
      break;
    case 'info':        
      break;
    case 'pong':        
      break;
    case 'error':
      // handle error
      break;
    default:
    console.log(message);
      throw new Error('Unknown event:', message.event);
      break;
  }
}

function App() {

  useEffect(() => {
    const client = new w3cwebsocket('wss://api-pub.bitfinex.com/ws/2', 'echo-protocol');

    client.onerror = function() {
      console.log('Connection Error');
    };
    
    client.onopen = function() {
        console.log('WebSocket Client Connected');
        let msg = JSON.stringify({ 
          event: 'subscribe', 
          channel: 'ticker', 
          symbol: 'tBTCUSD' 
        })
        client.send(msg);
    };
    
    client.onclose = function() {
        console.log('echo-protocol Client Closed');
    };
    
    client.onmessage = function(e) {
        const message = JSON.parse(e.data);
        if (Array.isArray(message)) {
          //update
          handleUpdate(message);
        } else {
          // Message (subscription ect.)
          handleMessage(message);
      }
    }; 

    return () => client.close();
  });

  return (
    <div className="App">
    </div>
  );
}

export default App;
