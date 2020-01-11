import selectWords from '../../selectors/words'; 

const words = [{
    id: '1',
    source: 'gut',
    destination: 'dobro',
    factor: 1,
    repeatAt: 0
}, {
    id: '2',
    source: 'bin ich nicht',
    destination: 'nisam',
    factor: 1.5,
    repeatAt: 1024
}, {
    id: '3',
    source: 'danke',
    destination: 'hvala',
    factor: 3,
    repeatAt: -1000
}];

test('should filter by text value with match in destination', () => {
    const filters = {
        text: 'a',
        sortBy: 'destination'
    };
    const result = selectWords(words, filters);
    expect(result).toEqual([words[2], words[1]]);
});

test('should filter by text value with match in source', () => {
    const filters = {
        text: 't',
        sortBy: 'destination'
    };
    const result = selectWords(words, filters);
    expect(result).toEqual([words[0], words[1]]);
});

test('should sort by source', () => {
    const filters = {
        text: '',
        sortBy: 'source'
    };
    const result = selectWords(words, filters);
    expect(result).toEqual([words[1], words[2], words[0]]);
});

test('should sort by destination', () => {
    const filters = {
        text: '',
        sortBy: 'destination'
    };
    const result = selectWords(words, filters);
    expect(result).toEqual([words[0], words[2], words[1]]);
});

test('should sort by repeat at', () => {
    const filters = {
        text: '',
        sortBy: 'repeatAt'
    };
    const result = selectWords(words, filters);
    expect(result).toEqual([words[2], words[0], words[1]]);
});