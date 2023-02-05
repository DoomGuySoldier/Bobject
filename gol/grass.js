const { CELL: { EMPTY, GRASS } } = require("./constants.js");
const livingCreatures = require("./livingCreatures.js");

module.exports = class Grass extends livingCreatures {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.rounds = 0;
    }

    mul() {
        this.rounds++;
        //console.log("grass mul", this.rounds);
        if (this.rounds >= 4) {
            let emptyFields = this.chooseCell(EMPTY);
            if (emptyFields.length > 0) {
                let theChosenField = emptyFields[Math.floor(Math.random() * emptyFields.length)]
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grasObj = new Grass(newX, newY);
                grassArr.push(grasObj);
                matrix[newY][newX] = GRASS;
            }
            this.rounds = 0;
        }
    }
}