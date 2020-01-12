import React from 'react';
import { shallow } from 'enzyme';
import WordListItem from '../../components/WordListItem';
import words from '../fixtures/words';

test('should render WordListItem with word', () => {
    const wrapper = shallow(<WordListItem key={words[0].id} {...words[0]} />);
    expect(wrapper).toMatchSnapshot();
});