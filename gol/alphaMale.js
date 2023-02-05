const {
    CELL: { EMPTY, PREDATOR, ALPHAMALE },
} = require("./constants.js");
const livingCreatures = require("./livingCreatures.js");

module.exports = class AlphaMale extends livingCreatures {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.eatCounter = 0;
        this.withoutEat = 0;
    }

    move() {
        //console.log("Grasfresser bewegung");
        let emptyFields = this.chooseCell(EMPTY);
        if (emptyFields.length > 0) {
            let newPos =
                emptyFields[Math.floor(Math.random() * emptyFields.length)];
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[newY][newX] = ALPHAMALE;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        //finde etwas zu fressen
        let predatorFields = this.chooseCell(PREDATOR);
        if (predatorFields.length > 0) {
            let predatorPos =
                predatorFields[
                    Math.floor(Math.random() * predatorFields.length)
                ]; //random(predatorFields);
            let newX = predatorPos[0];
            let newY = predatorPos[1];
            matrix[newY][newX] = ALPHAMALE;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < predatorArr.length; i++) {
                let predatorObj = predatorArr[i];
                if (predatorObj.x == newX && predatorObj.y == newY) {
                    predatorArr.splice(i, 1);
                }
            }
            // eatCounter erhöhen
            this.eatCounter++;
            this.withoutEat = 0;
        } else {
            //wenn nix zu fressen da ist
            this.eatCounter = 0;
            this.withoutEat++;
            this.move();
            this.die();
        }
    }

    die() {
        if (this.withoutEat >= 10) {
            matrix[this.y][this.x] = EMPTY;
            for (let i = 0; i < AlphaMaleArr.length; i++) {
                const AlphaMaleObj = AlphaMaleArr[i];
                if (AlphaMaleObj.x == this.x && AlphaMaleObj.y == this.y) {
                    AlphaMaleArr.splice(i, 1);
                }
            }
        }
    }

    mul() {
        if (this.rounds >= 10) {
            let emptyFields = this.chooseCell(EMPTY);
            if (emptyFields.length > 0) {
                let theChosenField =
                    emptyFields[Math.floor(Math.random() * emptyFields.length)];
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let AlphaMaleObj = new AlphaMale(newX, newY);
                AlphaMaleArr.push(AlphaMaleObj);
                matrix[newY][newX] = ALPHAMALE;
            }
        }
    }
};
