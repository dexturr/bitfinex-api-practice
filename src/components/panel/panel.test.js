import Panel from './panel';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

const exists = (component, selector, { count }) => expect(component.find(selector)).to.have.lengthOf(count); 
const doesNotExist = (component, selector) => exists(component, selector, { count: 0 });
const hasText = (component, selector, text) => expect(component.find(selector).text()).to.equal(text);

describe('Panel', () => {
    it('Should render without crashing', () => {
        shallow(<Panel />);
    });
    it('Should render a header and body by default', () => {
        const comp = shallow(<Panel/>);
        exists(comp, '.panel_header', { count: 1});
        exists(comp, '.panel_body', { count: 1});
    });
    it('Should render header text', () => {
        const comp = shallow(<Panel header={'Foo'}/>);
        hasText(comp, 'h1', 'Foo');
    });
    it('Should render children if open', () => {
        const comp = shallow(<Panel>
            <div className='test'></div>
            </Panel>);
        exists(comp, '.test', { count: 1});
    });
    it('Should render nothing is not open', () => {
        const comp = shallow(<Panel open={false}>
            <div className='test'></div>
            </Panel>);
        doesNotExist(comp, '.test');
    });
    it('Should toggle open/closed when header is clicked', () => {
        const comp = shallow(<Panel>
            <div className='test'></div>
            </Panel>);
        exists(comp, '.test', { count: 1});
        comp.find('.panel_header').simulate('click');
        doesNotExist(comp, '.test', { count: 1});
    });
})