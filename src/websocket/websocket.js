import { w3cwebsocket } from 'websocket';
import { createWsConnected, createWsSubscriptionSuccessful, createWsSubscriptionUpdate } from '../redux/action-creators';
import { tickerResponseMessage } from './responses';

const client = new w3cwebsocket('wss://api-pub.bitfinex.com/ws/2', 'echo-protocol');

export const init = (store) => {
    client.onerror = function() {
        // dispatch error action
        console.log('Connection Error');
      };
      
      client.onopen = function() {
        store.dispatch(createWsConnected());
        console.log('WebSocket Client Connected');
      };
      
      client.onclose = function() {
          // dispatch closed action
          console.log('echo-protocol Client Closed');
      };
      
      client.onmessage = function(e) {
          // dispatch update/subscription actions
          const message = JSON.parse(e.data);
          if (Array.isArray(message)) {
            store.dispatch(
                createWsSubscriptionUpdate(
                    tickerResponseMessage(message)
                )
            );
          } else {
            switch (message.event) {
                case "subscribed":
                store.dispatch(createWsSubscriptionSuccessful(message));
                    break;
                case 'error': 
                    throw new Error(JSON.stringify(message));
                case 'hb':
                    break;
                default:
                    break;
            }
        }
    }
}

export const emit = (message) => client.send(JSON.stringify(message));
