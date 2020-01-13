import React from 'react';
import{ shallow } from 'enzyme';
import { WordsSummary } from '../../components/WordsSummary';

test('should render WordSummary correctly with 1 word', () => {
    const wrapper = shallow(<WordsSummary wordsCount={1} dueWordsCount={1} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WordSummary correctly with multiple words', () => {
    const wrapper = shallow(<WordsSummary wordsCount={4} dueWordsCount={2} />);
    expect(wrapper).toMatchSnapshot();
});