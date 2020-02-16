const reducer = (accumulator, currentValue) => accumulator + currentValue;

export default (words) => {
    return words
        .map((word) => (word.repeatAt <= Date.now() || word.repeatAtInverted <= Date.now()) ? 1 : 0)
        .reduce(reducer, 0);
};
