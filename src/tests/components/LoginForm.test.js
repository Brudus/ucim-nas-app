import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from '../../components/LoginForm';

let startLogin, wrapper;

beforeEach(() => {
    startLogin = jest.fn();
    wrapper = shallow(
        <LoginForm
            startLogin={startLogin}
        />
    );
});

test('should render LoginForm', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should not have emailPassed with invalid email', () => {
    const value = 'email@';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('email')).toBe(value);
    expect(wrapper.state('emailPassed')).toBe(false);
});

test('should set emailPassed with valid email', () => {
    const value = 'email@test.com';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('email')).toBe(value);
    expect(wrapper.state('emailPassed')).toBe(true);
});

test('should set email on input change', () => {
    const value = 'newEmail';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('email')).toBe(value);
});

test('should set password on input change', () => {
    const value = 'newPassword';
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('password')).toBe(value);
});

test('should call startLogin prob for valid form submission', () => {
    const email = 'test@test.com';
    const password = 'savePassword';

    wrapper.find('input').at(0).simulate('change', {
        target: { value: email }
    });

    wrapper.find('input').at(1).simulate('change', {
        target: { value: password }
    });

    wrapper.find('form').simulate('submit', { 
        preventDefault: () => {} 
    });

    expect(wrapper.state('loginError')).toBe('');
    expect(wrapper.state('emailPassed')).toBe(true);
    expect(startLogin).toHaveBeenLastCalledWith(email, password);
});