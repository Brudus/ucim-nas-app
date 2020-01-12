import React from 'react';
import { shallow } from 'enzyme';
import { WordList } from '../../components/WordList';
import words from '../fixtures/words';

test('should render WordList with words', () => {
    const wrapper = shallow(<WordList words={words} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WordList with empty message', () => {
    const wrapper = shallow(<WordList words={[]} />);
    expect(wrapper).toMatchSnapshot();
});