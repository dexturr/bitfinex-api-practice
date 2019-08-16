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

const INITAL_STATE = {
    websocket: {
        ready: false,
    }
};

export default function app(state = INITAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.WS_CONNECTED:
        const { websocket } = state;
        return {
            ...websocket,
            ready: true,
        }
        default:
            return state;
    }
}