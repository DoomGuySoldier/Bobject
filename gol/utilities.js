function getNeighbors3x3(x, y) {
    return [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
    ];
}

function getNeighbors3x3WithMe(x, y) {
    return [
        [x, y],
        ...getNeighbors3x3(x, y)
    ];
}

module.exports = {
    getNeighbors3x3,
    getNeighbors3x3WithMe
};
