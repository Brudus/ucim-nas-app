import React from 'react';
import { shallow } from 'enzyme';
import words from '../fixtures/words';
import { StudyPage } from '../../components/StudyPage';

const startDate = 1487076708000;
const dayInMs = 1000 * 60 * 60 * 24;
const globalDate = Date;
const defaultWordsMapped = words.map((word) => ({...word, type: 'default'}));
const invertedWordsMapped = words.map((word) => ({...word, type: 'inverted'}));
let startEditWord, history, wordsWOReference, invertedWordsWOReference;

beforeAll(() => {
    Date.now = jest.fn(() => startDate);
});

beforeEach(() => {
    startEditWord = jest.fn();
    history = { push: jest.fn() };
    wordsWOReference = JSON.parse(JSON.stringify(defaultWordsMapped));
    invertedWordsWOReference = JSON.parse(JSON.stringify(invertedWordsMapped));
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
    expect(wrapper.state('currentWord')).toEqual(defaultWordsMapped[0]);
    expect(wrapper.state('words')).toEqual(defaultWordsMapped);
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

// Tests for default case 
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
    expect(stateCurrentWord.easeFactor).toBe(defaultWordsMapped[0].easeFactor - 0.8);
    expect(stateCurrentWord.repeatAt).toEqual(1487076708000);
    expect(wrapper.state('currentWord')).toEqual(defaultWordsMapped[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([defaultWordsMapped[1], defaultWordsMapped[2], stateCurrentWord]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAt: stateCurrentWord.repeatAt,
        interval: stateCurrentWord.interval,
        reps: stateCurrentWord.reps,
        easeFactor: stateCurrentWord.easeFactor,
        isNew: false
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
    expect(stateCurrentWord.reps).toBe(defaultWordsMapped[0].reps + 1);
    expect(stateCurrentWord.easeFactor).toBe(2.36);
    expect(stateCurrentWord.repeatAt).toEqual(1487076708000);
    expect(wrapper.state('currentWord')).toEqual(defaultWordsMapped[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([defaultWordsMapped[1], defaultWordsMapped[2], stateCurrentWord]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAt: stateCurrentWord.repeatAt,
        interval: stateCurrentWord.interval,
        reps: stateCurrentWord.reps,
        easeFactor: stateCurrentWord.easeFactor,
        isNew: false
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
    expect(stateCurrentWord.reps).toBe(defaultWordsMapped[0].reps + 1);
    expect(stateCurrentWord.easeFactor).toBe(defaultWordsMapped[0].easeFactor);
    expect(stateCurrentWord.repeatAt).toEqual(1487076708000 + stateCurrentWord.interval * dayInMs);
    expect(wrapper.state('currentWord')).toEqual(defaultWordsMapped[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([defaultWordsMapped[1], defaultWordsMapped[2]]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAt: stateCurrentWord.repeatAt,
        interval: stateCurrentWord.interval,
        reps: stateCurrentWord.reps,
        easeFactor: stateCurrentWord.easeFactor,
        isNew: false
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
    expect(stateCurrentWord.reps).toBe(defaultWordsMapped[0].reps + 1);
    expect(stateCurrentWord.easeFactor).toBe(2.6);
    expect(stateCurrentWord.repeatAt).toEqual(1487076708000 + stateCurrentWord.interval * dayInMs);
    expect(wrapper.state('currentWord')).toEqual(defaultWordsMapped[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([defaultWordsMapped[1], defaultWordsMapped[2]]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAt: stateCurrentWord.repeatAt,
        interval: stateCurrentWord.interval,
        reps: stateCurrentWord.reps,
        easeFactor: stateCurrentWord.easeFactor,
        isNew: false
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
    expect(stateCurrentWord.interval).toBe(defaultWordsMapped[0].interval);
    expect(stateCurrentWord.reps).toBe(defaultWordsMapped[0].reps);
    expect(stateCurrentWord.easeFactor).toBe(defaultWordsMapped[0].easeFactor);
    expect(stateCurrentWord.repeatAt).toEqual(defaultWordsMapped[0].repeatAt);
    expect(wrapper.state('currentWord')).toEqual(defaultWordsMapped[0]);
    expect(wrapper.state('words')).toEqual(defaultWordsMapped); 
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
    expect(stateCurrentWord.interval).toBe(defaultWordsMapped[0].interval);
    expect(stateCurrentWord.reps).toBe(defaultWordsMapped[0].reps);
    expect(stateCurrentWord.easeFactor).toBe(defaultWordsMapped[0].easeFactor);
    expect(stateCurrentWord.repeatAt).toEqual(defaultWordsMapped[0].repeatAt);
    expect(wrapper.state('currentWord')).toEqual(defaultWordsMapped[0]);
    expect(wrapper.state('words')).toEqual(defaultWordsMapped); 
});

// Tests for inverted case
test('should calculate schedule (inverted) correctly and put word at end of list for grade 0', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={invertedWordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(0);
    expect(stateCurrentWord.intervalInverted).toBe(0);
    expect(stateCurrentWord.repsInverted).toBe(0);
    expect(stateCurrentWord.easeFactorInverted).toBe(invertedWordsMapped[0].easeFactorInverted - 0.8);
    expect(stateCurrentWord.repeatAtInverted).toEqual(1487076708000);
    expect(wrapper.state('currentWord')).toEqual(invertedWordsMapped[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([invertedWordsMapped[1], invertedWordsMapped[2], stateCurrentWord]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAtInverted: stateCurrentWord.repeatAtInverted,
        intervalInverted: stateCurrentWord.intervalInverted,
        repsInverted: stateCurrentWord.repsInverted,
        easeFactorInverted: stateCurrentWord.easeFactorInverted,
        isNewInverted: false
    }); 
});

test('should calculate schedule (inverted) correctly and put word at end of list for grade 3', () => {
    const wrapper = shallow( 
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={invertedWordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(3);
    expect(stateCurrentWord.intervalInverted).toBe(0);
    expect(stateCurrentWord.repsInverted).toBe(invertedWordsMapped[0].repsInverted + 1);
    expect(stateCurrentWord.easeFactorInverted).toBe(2.36);
    expect(stateCurrentWord.repeatAtInverted).toEqual(1487076708000);
    expect(wrapper.state('currentWord')).toEqual(invertedWordsMapped[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([invertedWordsMapped[1], invertedWordsMapped[2], stateCurrentWord]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAtInverted: stateCurrentWord.repeatAtInverted,
        intervalInverted: stateCurrentWord.intervalInverted,
        repsInverted: stateCurrentWord.repsInverted,
        easeFactorInverted: stateCurrentWord.easeFactorInverted,
        isNewInverted: false
    });
});

test('should calculate schedule (inverted) correctly and remove word from list for grade 4', () => {
    const wrapper = shallow( 
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={invertedWordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(4);
    expect(stateCurrentWord.intervalInverted).toBe(5);
    expect(stateCurrentWord.repsInverted).toBe(invertedWordsMapped[0].repsInverted + 1);
    expect(stateCurrentWord.easeFactorInverted).toBe(invertedWordsMapped[0].easeFactorInverted);
    expect(stateCurrentWord.repeatAtInverted).toEqual(1487076708000 + stateCurrentWord.intervalInverted * dayInMs);
    expect(wrapper.state('currentWord')).toEqual(invertedWordsMapped[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([invertedWordsMapped[1], invertedWordsMapped[2]]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAtInverted: stateCurrentWord.repeatAtInverted,
        intervalInverted: stateCurrentWord.intervalInverted,
        repsInverted: stateCurrentWord.repsInverted,
        easeFactorInverted: stateCurrentWord.easeFactorInverted,
        isNewInverted: false
    });
});

test('should calculate schedule (inverted) correctly and remove word from list for grade 5', () => {
    const wrapper = shallow( 
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={invertedWordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(5);
    expect(stateCurrentWord.intervalInverted).toBe(6);
    expect(stateCurrentWord.repsInverted).toBe(invertedWordsMapped[0].repsInverted + 1);
    expect(stateCurrentWord.easeFactorInverted).toBe(2.6);
    expect(stateCurrentWord.repeatAtInverted).toEqual(1487076708000 + stateCurrentWord.intervalInverted * dayInMs);
    expect(wrapper.state('currentWord')).toEqual(invertedWordsMapped[1]);
    expect(wrapper.state('showAnswer')).toBe(false);
    expect(wrapper.state('words')).toEqual([invertedWordsMapped[1], invertedWordsMapped[2]]);
    expect(startEditWord).toHaveBeenLastCalledWith(stateCurrentWord.id, {
        repeatAtInverted: stateCurrentWord.repeatAtInverted,
        intervalInverted: stateCurrentWord.intervalInverted,
        repsInverted: stateCurrentWord.repsInverted,
        easeFactorInverted: stateCurrentWord.easeFactorInverted,
        isNewInverted: false
    });
});

test('should calculate schedule (inverted) correctly and put word at end of list for incorrect grade -1', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={invertedWordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(7);
    expect(stateCurrentWord.intervalInverted).toBe(invertedWordsMapped[0].intervalInverted);
    expect(stateCurrentWord.repsInverted).toBe(invertedWordsMapped[0].repsInverted);
    expect(stateCurrentWord.easeFactorInverted).toBe(invertedWordsMapped[0].easeFactorInverted);
    expect(stateCurrentWord.repeatAtInverted).toEqual(invertedWordsMapped[0].repeatAtInverted);
    expect(wrapper.state('currentWord')).toEqual(invertedWordsMapped[0]);
    expect(wrapper.state('words')).toEqual(invertedWordsMapped); 
});

test('should calculate schedule (inverted) correctly and put word at end of list for incorrect grade 7', () => {
    const wrapper = shallow(
        <StudyPage 
            startEditWord={startEditWord} 
            history={history} 
            words={invertedWordsWOReference} 
        />
    );
    wrapper.find('button').simulate('click');
    const stateCurrentWord = wrapper.state('currentWord');
    wrapper.find('StudySelectionOption').at(0).prop('calculateNewSchedule')(7);
    expect(stateCurrentWord.intervalInverted).toBe(invertedWordsMapped[0].intervalInverted);
    expect(stateCurrentWord.repsInverted).toBe(invertedWordsMapped[0].repsInverted);
    expect(stateCurrentWord.easeFactorInverted).toBe(invertedWordsMapped[0].easeFactorInverted);
    expect(stateCurrentWord.repeatAtInverted).toEqual(invertedWordsMapped[0].repeatAtInverted);
    expect(wrapper.state('currentWord')).toEqual(invertedWordsMapped[0]);
    expect(wrapper.state('words')).toEqual(invertedWordsMapped); 
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