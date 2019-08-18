import { setupTest } from './tests/test-harness';
import { expect } from 'chai';
import App from './App';

// TODO: I need to mock the websocket connect in order to mock server responses for acceptance testing
// using jest-websocket-mock I get test timeouts due to async functions still execting.
// need some kind of server.send(/** message detail */) function that correctly mocks WS responses.

// Then I can have nice acceptance tests:
/**
 * it('should update state when receiving server message', function() {
 *  const component = setupTest(props);
 *  server.send(msg);
 *  component.update();
 *  server.receivedMessages.includes(subscriptionMessage);
 *  server.send(msg);
 *  component.update();
 *  expect(component).to.have.updated.some.property;
 *  component.detach();
 *  server.receivedMessages.includes(unsubscribeMessage);
 * })
 */

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
  expect(component.find('.lds-spinner')).to.have.lengthOf(1);;
});
