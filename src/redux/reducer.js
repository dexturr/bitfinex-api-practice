import ACTIONS from './action-types';
import { w3cwebsocket } from 'websocket';

// const handleUpdate = (message) => {
//     // Find the appropriate market this update pertains to
  
//     // Dispatch relavent actions
// }
  
//   const handleMessage = (message) => {
//     switch (message.event) {
//       case 'subscribed':  
//         console.log(message);      
//         break;
//       case 'unsubscribed':    
//         break;
//       case 'info':        
//         break;
//       case 'pong':        
//         break;
//       case 'error':
//         // handle error
//         break;
//       default:
//       console.log(message);
//         throw new Error('Unknown event:', message.event);
//     }
//   }

const INITIAL_STATE = {
    websocket: {
        ready: false,
    },
    tickers: [],
    subscriptions: {
        tickerSubscriptions: [],
    }
};

export default function app(state = INITIAL_STATE, action) {
    console.log(state);
    switch (action.type) {
        case ACTIONS.WS_CONNECTED:
            const { websocket } = state;
            return {
                ...state,
                websocket: {
                    ...websocket,
                    ready: true,
                }
            }
        case ACTIONS.WS_SUBSCRIPTION_SUCCESSFUL:
            const { tickerSubscriptions } = state.subscriptions;
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    tickerSubscriptions: [...tickerSubscriptions, action.payload],
                }
            }
        case ACTIONS.WS_SUBSCRIPTION_UPDATE: 
            const { tickers } = state;
            
            return {
                ...state,
                tickers: [...tickers.filter(({ channelId }) => channelId !== action.payload.channelId), action.payload]
            }
        default:
            return state;
    }
}