import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { w3cwebsocket } from 'websocket';



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
        } else {
          //subscription
        if (message.event === 'subscribed') {
          if (message.chanId) {
            let msg2 = JSON.stringify({ 
              event: 'unsubscribe', 
              chanId: message.chanId,  
            })
            client.send(msg2);
          }
        } else if (message.event === 'unsubscribed'){
          console.log(message);          
        } else if (message.event === 'info') {
          console.log(message);          
  
        } 
        else {
          throw new Error(JSON.stringify(message));
        }
  
      }
    };
  });

  return (
    <div className="App">
    </div>
  );
}

export default App;
