const livingCreatures = require("./livingCreatures.js");

module.exports = class Grass extends livingCreatures{
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.rounds = 0;
        // this.color = "green";
        // this.index = 1;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(symbol) {
        let found = [];
        // wir suchen nach leeren Feldern - Wert 0
        for (let i = 0; i < this.neighbors.length; i++) {
            const pos = this.neighbors[i];  //[x,y]
            let posX = pos[0];
            let posY = pos[1];

            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                let wert = matrix[posY][posX];
                if (wert == symbol) {
                    found.push(pos);
                }
            }

        }
        return found;
    }
    mul() {
        this.rounds++;
        //console.log("grass mul", this.rounds);
        if (this.rounds >= 4) {
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0) {
                let theChosenField = emptyFields[Math.floor(Math.random() * emptyFields.length)]
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grasObj = new Grass(newX, newY);
                grassArr.push(grasObj);

                matrix[newY][newX] = 1;
            }
            this.rounds = 0;
        }
    }
}