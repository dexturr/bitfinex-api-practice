import React from 'react';
import { renderComponent } from './tests/test-harness';
import { useSelector } from 'react-redux';

const TestComp = ({test}) => {
  useSelector((store) => {
    console.log(store);
  })
  return <h1>TEST</h1>
}

it('test harness', function() {
  renderComponent(TestComp, {test: 123})
  // console.log(reduxComponent);
  
});
