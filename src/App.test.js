import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import { expect } from 'chai';

const TestComp = () => {
  return <h1>TEST</h1>
}

it('renders without crashing', () => {
  const comp = mount(<TestComp />);

  expect(comp.find('h1')).to.have.lengthOf(1);
});
