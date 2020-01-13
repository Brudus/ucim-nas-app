import filterWordsDue from '../../selectors/words-due';
import words from '../fixtures/words';

test('should return 0 if no words passed', () => {
    const result = filterWordsDue([]);
    expect(result).toBe(0);
});

test('should return 0 when no word is due', () => {
    const firstWord = { ...words[0] };
    const secondWord = { ...words[1] };
    firstWord.repeatAt = Date.now() + 1000 * 60 * 60 * 24;
    secondWord.repeatAt = Date.now() + 1000 * 60 * 60 * 24;
    const wordsDueInFuture = [firstWord, secondWord];
    const result = filterWordsDue(wordsDueInFuture);
    expect(result).toBe(0);
});

test('should return 1 if single due word', () => {
    const lastWord = { ...words[words.length - 1] };
    lastWord.repeatAt = Date.now() + 1000 * 60 * 60 * 24;
    const wordsToTest = [...words, lastWord];
    const result = filterWordsDue(wordsToTest);
    expect(result).toBe(wordsToTest.length - 1);
});

test('should return length if all words are due', () => {
    const result = filterWordsDue(words);
    expect(result).toBe(words.length);
});