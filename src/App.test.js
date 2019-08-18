import { setupTest } from './tests/test-harness';
import { expect } from 'chai';
import App from './App';

// TODO: I need to mock the websocket connect in order to mock server responses for acceptance testing

// import { createWsConnected } from './redux/action-creators';

// let store; 
let renderComponent;

beforeEach(function() {
  const testState = setupTest(App);
  // store = testState.store;
  renderComponent = testState.renderComponent;
})

it('it renders a loading state initially', function() {
  const component = renderComponent(App)
  expect(component.find('div').text()).to.equal('Loading');
});

// it('it renders home component once loading is complete', function() {
//   const component = renderComponent(App);
//   store.dispatch(createWsConnected());
//   component.update();

//   const msg1 = {type:'WS_SUBSCRIPTION_SUCCESSFUL',payload:{event:'subscribed',channel:'ticker',chanId:1,symbol:'tBTCUSD',pair:'BTCUSD'}};

//   const test = {
//     type: 'WS_SUBSCRIPTION_UPDATE',
//     payload: {
//       channelId: 1, 
//       data: { 
//         bid: 10320, 
//         bidSize: 84.98028129, 
//         ask: 10321, 
//         askSize: 68.8741878, 
//         dailyChange: 126, 
//         dailyChangePerc: 0.0124, 
//         lastPrice: 10320, 
//         volume: 6357.57073259, 
//         high: 10568, 
//         low: 10052
//       }
//     }
//   };
//   store.dispatch(msg1);
//   store.dispatch(test);
//   component.update();
  
//   expect(component.find('Home')).to.have.lengthOf(1);
//   console.log(component.html())
// });