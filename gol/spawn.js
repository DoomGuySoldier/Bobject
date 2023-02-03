const { CELL: { EMPTY } } = require("./constants.js");

module.exports = class Accident {
    constructor(cell, matrixSize) {
        this.cell = cell;
        this.x = Math.floor(Math.random() * matrixSize);
        this.y = Math.floor(Math.random() * matrixSize);
        this.neighbors = [
            [this.x, this.y],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    execute() {
        console.log("Beam me up, Scottie...");
        for (let i = 0; i < this.neighbors.length; i++) {
            const pos = this.neighbors[i];
            let posX = pos[0];
            let posY = pos[1];
            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                matrix[posY][posX] = this.cell;
            }
        }
    }
};
