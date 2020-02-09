import React from 'react';
import { shallow } from 'enzyme';
import WordListItem from '../../components/WordListItem';
import words from '../fixtures/words';

test('should render WordListItem with word (now)', () => {
    const wrapper = shallow(<WordListItem key={words[0].id} {...words[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WordListItem correctly with word (today)', () => {
    const halfADay = 0.5 * 1000 * 60 * 60 * 24;
    const repeatAt = Date.now() + halfADay;
    const repeatAtInverted = repeatAt;
    const changedWord = {...words[1], repeatAt, repeatAtInverted};
    const wrapper = shallow(<WordListItem key={words[1].id} {...changedWord} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WordListItem correctly with word (tomorrow)', () => {
    const oneAndAHalfDay = 1.5 * 1000 * 60 * 60 * 24;
    const repeatAt = Date.now() + oneAndAHalfDay;
    const repeatAtInverted = repeatAt;
    const changedWord = {...words[1], repeatAt, repeatAtInverted};
    const wrapper = shallow(<WordListItem key={words[1].id} {...changedWord} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WordListItem correctly with word (in 2 days)', () => {
    const twoAndAHalfADay = 2.5 * 1000 * 60 * 60 * 24;
    const repeatAt = Date.now() + twoAndAHalfADay;
    const repeatAtInverted = repeatAt;
    const changedWord = {...words[1], repeatAt, repeatAtInverted};
    const wrapper = shallow(<WordListItem key={words[1].id} {...changedWord} />);
    expect(wrapper).toMatchSnapshot();
});
