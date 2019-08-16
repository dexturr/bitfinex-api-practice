import ACTIONS from './action-types';
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
    }
  }

const INITAL_STATE = {
    websocket: null
};

export default function app(state = INITAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.CONNECT_TO_WEBSOCKET:
            if (state.websocket) {
                throw new Error('Tried to create a second instance of websocket');
            }
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

            return {
                websocket: client,
            }
        default:
            return state;
    }
}