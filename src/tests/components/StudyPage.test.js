import React from 'react';
import { shallow } from 'enzyme';
import words from '../fixtures/words';
import { StudyPage } from '../../components/StudyPage';

const startDate = 1487076708000;
const dayInMs = 1000 * 60 * 60 * 24;
const globalDate = Date;
let startEditWord, history, wordsWOReference;

beforeAll(() => {
    Date.now = jest.fn(() => startDate);
});

beforeEach(() => {
    startEditWord = jest.fn();
    history = { push: jest.fn() };
    wordsWOReference = JSON.parse(JSON.stringify(words));
});

afterAll(() => {
    global.Date = globalDate;
});

test('should render StudyPage with words', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={wordsWOReference} 
        />
    );
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('currentWord')).toEqual(words[0]);
    expect(wrapper.state('words')).toEqual(words);
    expect(wrapper).toMatchSnapshot();
});

test('should push on history if words are empty', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={[]} 
        />
    );
    expect(history.push).toHaveBeenLastCalledWith('/'); 
});

test('should set answer state on button click', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={wordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.state('showAnswer')).toBe(true);
    expect(wrapper).toMatchSnapshot();
});

test('should calculate schedule correctly and put word at end of list for grade 0', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={wordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(0);
    expect(stateCurrentWord.interval).toBe(0);
    expect(stateCurrentWord.reps).toBe(0);
    expect(stateCurrentWord.easeFactor).toBe(words[0].easeFactor - 0.8);
    expect(stateCurrentWord.repeatAt).toEqual(1487076708000);
    expect(wrapper.state('currentWord')).toEqual(words[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([words[1], words[2], stateCurrentWord]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAt: stateCurrentWord.repeatAt,
        interval: stateCurrentWord.interval,
        reps: stateCurrentWord.reps,
        easeFactor: stateCurrentWord.easeFactor
    }); 
});

test('should calculate schedule correctly and put word at end of list for grade 3', () => {
    const wrapper = shallow( 
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={wordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(3);
    expect(stateCurrentWord.interval).toBe(0);
    expect(stateCurrentWord.reps).toBe(words[0].reps + 1);
    expect(stateCurrentWord.easeFactor).toBe(2.36);
    expect(stateCurrentWord.repeatAt).toEqual(1487076708000);
    expect(wrapper.state('currentWord')).toEqual(words[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([words[1], words[2], stateCurrentWord]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAt: stateCurrentWord.repeatAt,
        interval: stateCurrentWord.interval,
        reps: stateCurrentWord.reps,
        easeFactor: stateCurrentWord.easeFactor
    });
});

test('should calculate schedule correctly and remove word from list for grade 4', () => {
    const wrapper = shallow( 
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={wordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(4);
    expect(stateCurrentWord.interval).toBe(8);
    expect(stateCurrentWord.reps).toBe(words[0].reps + 1);
    expect(stateCurrentWord.easeFactor).toBe(words[0].easeFactor);
    expect(stateCurrentWord.repeatAt).toEqual(1487076708000 + stateCurrentWord.interval * dayInMs);
    expect(wrapper.state('currentWord')).toEqual(words[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([words[1], words[2]]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAt: stateCurrentWord.repeatAt,
        interval: stateCurrentWord.interval,
        reps: stateCurrentWord.reps,
        easeFactor: stateCurrentWord.easeFactor
    });
});

test('should calculate schedule correctly and remove word from list for grade 5', () => {
    const wrapper = shallow( 
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={wordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(5);
    expect(stateCurrentWord.interval).toBe(8);
    expect(stateCurrentWord.reps).toBe(words[0].reps + 1);
    expect(stateCurrentWord.easeFactor).toBe(2.6);
    expect(stateCurrentWord.repeatAt).toEqual(1487076708000 + stateCurrentWord.interval * dayInMs);
    expect(wrapper.state('currentWord')).toEqual(words[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([words[1], words[2]]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAt: stateCurrentWord.repeatAt,
        interval: stateCurrentWord.interval,
        reps: stateCurrentWord.reps,
        easeFactor: stateCurrentWord.easeFactor
    });
});

test('should calculate schedule correctly and put word at end of list for incorrect grade -1', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={wordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(7);
    expect(stateCurrentWord.interval).toBe(words[0].interval);
    expect(stateCurrentWord.reps).toBe(words[0].reps);
    expect(stateCurrentWord.easeFactor).toBe(words[0].easeFactor);
    expect(stateCurrentWord.repeatAt).toEqual(words[0].repeatAt);
    expect(wrapper.state('currentWord')).toEqual(words[0]);
    expect(wrapper.state('words')).toEqual(words); 
});

test('should calculate schedule correctly and put word at end of list for incorrect grade 7', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={wordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(7);
    expect(stateCurrentWord.interval).toBe(words[0].interval);
    expect(stateCurrentWord.reps).toBe(words[0].reps);
    expect(stateCurrentWord.easeFactor).toBe(words[0].easeFactor);
    expect(stateCurrentWord.repeatAt).toEqual(words[0].repeatAt);
    expect(wrapper.state('currentWord')).toEqual(words[0]);
    expect(wrapper.state('words')).toEqual(words); 
});

test('should navigate to / when last word is learned', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={[wordsWOReference[1]]} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(5);
    expect(history.push).toHaveBeenLastCalledWith('/'); 
});