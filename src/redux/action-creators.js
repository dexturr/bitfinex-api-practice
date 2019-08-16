import ACTIONS from './action-types';
import { createAction } from 'redux-actions';
import { emit } from '../websocket/websocket';
import { create } from 'domain';

const generateTickerMessage = ({ symbol }) => {
    return { 
        event: 'subscribe', 
        channel: 'ticker', 
        symbol, 
    }
}

const createConnectToWebsocket = createAction(ACTIONS.CONNECT_TO_WEBSOCKET);
const createWsSubscribeToTickerAction = createAction(ACTIONS.WS_SUBSCRIBE_TO_TICKER);
const createWsConnected = createAction(ACTIONS.WS_CONNECTED);
const createWsSubscriptionSuccessful = createAction(ACTIONS.WS_SUBSCRIPTION_SUCCESSFUL);
const createWsSubscriptionUpdate = createAction(ACTIONS.WS_SUBSCRIPTION_UPDATE);

const createWsSubscribeToTicker = (payload) => {
    const message = generateTickerMessage(payload);
    emit(message);
    return createWsSubscribeToTickerAction(message);
}

export {
    createConnectToWebsocket,
    createWsSubscribeToTicker,
    createWsConnected,
    createWsSubscriptionSuccessful,
    createWsSubscriptionUpdate,
}