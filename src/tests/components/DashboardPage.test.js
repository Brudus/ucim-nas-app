import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../components/DashboardPage';

test('should render DashboardPage', () => {
    const dueWordsCount = 20;
    const wrapper = shallow(<DashboardPage dueWordsCount={dueWordsCount} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render DashboardPage without due words', () => {
    const dueWordsCount = 0;
    const wrapper = shallow(<DashboardPage dueWordsCount={dueWordsCount} />);
    expect(wrapper).toMatchSnapshot();
});