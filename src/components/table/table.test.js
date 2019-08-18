import React from 'react';
import { shallow, mount } from 'enzyme';
import Table from './table';
import { expect } from 'chai';

// TODO shareable
const exists = (component, selector, { count }) => expect(component.find(selector)).to.have.lengthOf(count); 
const doesNotExist = (component, selector) => exists(component, selector, { count: 0 });
const hasText = (component, selector, text) => expect(component.find(selector).text()).to.equal(text);

const renderComp = (props = {}) =>  shallow(<Table {...props} />)
const mountComp = (props = {}) => mount(<Table {...props} />);

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
    it('Should sort by leftmost header firstly', () => {
        const comp = mountComp({
            rows: [
                {
                    bar: 'B',
                },
                {
                    bar: 'A',
                }
            ],
            headers: {
                foo: 'bar',
                baz: 'quxx'
            },
        });
        const rows = comp.find('.ReactVirtualized__Table__rowColumn');
        expect(rows.at(0).text()).to.equal('A');
        expect(rows.at(1).tex()).to.equal('B');
    });
    it('Should reorder when clicking on a colum header', () => {
        const comp = mountComp({
            rows: [
                {
                    quxx: 2,
                },
                {
                    quxx: 1,
                },
                {
                    quxx: 3,
                }
            ],
            headers: {
                foo: 'bar',
                baz: 'quxx'
            },
        });
        const rows = comp.find('.ReactVirtualized__Table__rowColumn');
        expect(rows.at(0).text()).to.equal('1');
        expect(rows.at(1).tex()).to.equal('2');
        expect(rows.at(2).tex()).to.equal('3');
    });
})

