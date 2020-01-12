import React from 'react';
import { shallow } from 'enzyme';
import WordForm from '../../components/WordForm';
import words from '../fixtures/words';

test('should render WordForm correctly', () => {
    const wrapper = shallow(<WordForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render WordForm with word data', () => {
    const wrapper = shallow(<WordForm word={words[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<WordForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', { 
        preventDefault: () => {} 
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set destination on input change', () => {
    const value = 'New destination';
    const wrapper = shallow(<WordForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('destination')).toBe(value);
});

test('should set source on input change', () => {
    const value = 'New source';
    const wrapper = shallow(<WordForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('source')).toBe(value);
});

test('should call onSubmit prop for valid from submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<WordForm word={words[1]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', { 
        preventDefault: () => {} 
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        destination: words[1].destination,
        source: words[1].source,
        repeatAt: words[1].repeatAt
    });
});