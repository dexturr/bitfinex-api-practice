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
    subscriptions: {
        tickerSubscriptions: [],
    }
};

export default function app(state = INITIAL_STATE, action) {
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
            const { tickerSubscriptions: ts } = state.subscriptions;
            const ticker = ts.find(({ chanId }) => action.payload.channelId === chanId);

            const newTicker = {
                ...ticker,
                data: {
                    ...action.payload.data
                }
            }
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    tickerSubscriptions: [
                        ...ts.filter(({ chanId }) => action.payload.channelId !== chanId),
                        newTicker,
                    ],
                }
            }
        default:
            return state;
    }
}