import React from 'react';
import { shallow } from 'enzyme';
import Table from './table';

// TODO shareable
const exists = (component, selector, { count }) => expect(component.find(selector)).to.have.lengthOf(count); 

const renderComp = (props = {}) =>  shallow(<Table {...props} />)

describe('Virtualized Table', () => {
    it('Should render if passed rows and headers', () => {
        // Use case for passing headers/rows is unlikely. Require these as passing rows = undefined is likely an issue further up.
        renderComp({
            rows: [],
            headers: {},
        });
    });
    it('Should render a column for each header', () => {
        const comp = renderComp({
            rows: [],
            headers: {
                foo: 'bar',
                baz: 'quxx'
            },
        });
        exists(comp, 'Column', { count: 2});
    });
})