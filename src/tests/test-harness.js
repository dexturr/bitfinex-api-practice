import React from 'react';
import { mount } from 'enzyme';
import { mergeDeepRight } from 'ramda';
import rootReducer from '../redux/reducer';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

export const renderComponent = (Component, props) => {
    const store = createReduxStore();
    const renderComponent = makeMountRender(reduxify(Component, props, store));
    renderComponent();
}

// Need to import initial state
export const createReduxStore = (state = {}) => makeStore(state); 

export const reduxify = (Component, props = {}, store) => {
  return function reduxWrap() {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }
};


export const makeMountRender = (Component, defaultProps = {}) => {
  return (customProps = {}) => {
    const props = {
      ...defaultProps,
      ...customProps
    };
    return mount(<Component {...props} />);
  };
};

export const makeStore = (customState) => {
  const root = rootReducer({}, { type: '@@INIT' });
  const state = mergeDeepRight(root, customState);
  return createStore(rootReducer, state);
};