export default (words, { text, sortBy }) => {
    return words.filter((word) => {
        const sourceText = word.source.toLowerCase()
        const destinationText = word.destination.toLowerCase();
        const searchText = text.toLowerCase().trim();

        const sourceMatch = sourceText.includes(searchText);
        const destinationMatch = destinationText.includes(searchText);
        return sourceMatch || destinationMatch;
    }).sort((a, b) => {
        if (sortBy === 'repeatAt') {
            return a.repeatAt > b.repeatAt ? 1 : -1;
        } else if (sortBy === 'source') {
            const aText = a.source.toLowerCase().trim();
            const bText = b.source.toLowerCase().trim();
            return aText > bText ? 1 : -1;
        } else if (sortBy === 'destination') {
            const aText = a.destination.toLowerCase().trim();
            const bText = b.destination.toLowerCase().trim();
            return aText > bText ? 1 : -1;
        }
    });
};