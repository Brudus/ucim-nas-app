import React from 'react';
import { shallow } from 'enzyme';
import { WordListFilters } from '../../components/WordListFilters';
import { defaultFilters, changedFilters } from '../fixtures/filters';

let setTextFilter, sortByDestination, sortBySource, sortByRepeatAt, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDestination = jest.fn();
    sortBySource = jest.fn();
    sortByRepeatAt = jest.fn();
    wrapper = shallow(
        <WordListFilters 
            filters={defaultFilters}
            setTextFilter={setTextFilter}
            sortBySource={sortBySource}
            sortByDestination={sortByDestination}
            sortByRepeatAt={sortByRepeatAt}
        />
    );
});

test('should render WordListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render WordListFilters with changed filters correclty', () => {
    wrapper.setProps({
        filters: changedFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'd';
    const event = {
        target: { value }
    };
    wrapper.find('input').prop('onChange')(event);
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by destination', () => {
    const value = 'destination';
    wrapper.setProps({
        filters: changedFilters
    })
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByDestination).toHaveBeenCalled();
});

test('should sort by source', () => {
    const value = 'source';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortBySource).toHaveBeenCalled();
});

test('should sort by repeatAt', () => {
    const value = 'repeatAt';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByRepeatAt).toHaveBeenCalled();
});