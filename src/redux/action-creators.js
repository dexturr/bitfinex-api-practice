import ACTIONS from './action-types';
import { createAction } from 'redux-actions';

const createConnectToWebsocket = createAction(ACTIONS.CONNECT_TO_WEBSOCKET);

export {
    createConnectToWebsocket,
}