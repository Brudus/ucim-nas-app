import React from 'react';
import { shallow } from 'enzyme';
import StudySelectionOption from '../../components/StudySelectOption';

let calculateNewSchedule;

beforeEach(() => {
    calculateNewSchedule = jest.fn();
});

test('should render StudySelectionOption with text', () => {
    const grade = 0;
    const text = "Again"
    const wrapper = shallow(<StudySelectionOption grade={grade} text={text} calculateNewSchedule={calculateNewSchedule} />);
    expect(wrapper).toMatchSnapshot();
});

test('should call calculateNewSchedule with grade when button is pressed', () => {
    const grade = 3;
    const text = "Hard"
    const wrapper = shallow(<StudySelectionOption grade={grade} text={text} calculateNewSchedule={calculateNewSchedule} />);
    wrapper.find('button').simulate('click');
    expect(calculateNewSchedule).toHaveBeenLastCalledWith(grade);
});