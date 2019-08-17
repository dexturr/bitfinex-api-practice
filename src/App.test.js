import { setupTest } from './tests/test-harness';
import { expect } from 'chai';
import App from './App';
import { createWsConnected } from './redux/action-creators';

let store, renderComponent;

beforeEach(function() {
  const testState = setupTest(App);
  store = testState.store;
  renderComponent = testState.renderComponent;
})

it('it renders a loading state initially', function() {
  const component = renderComponent(App)
  expect(component.find('div').text()).to.equal('Loading');
});

it('it renders home component once loading is complete', function() {
  const component = renderComponent(App);
  store.dispatch(createWsConnected());
  component.update();
  expect(component.find('Home')).to.have.lengthOf(1);
});