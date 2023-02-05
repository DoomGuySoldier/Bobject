const {
    CELL: { EMPTY, GRAZER, PREDATOR },
} = require("./constants.js");
const livingCreatures = require("./livingCreatures.js");

module.exports = class Predator extends livingCreatures {
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
            matrix[newY][newX] = PREDATOR;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        //finde etwas zu fressen
        let grazerFields = this.chooseCell(GRAZER);
        if (grazerFields.length > 0) {
            let grazerPos =
                grazerFields[Math.floor(Math.random() * grazerFields.length)]; //random(grazerFields);
            let newX = grazerPos[0];
            let newY = grazerPos[1];
            matrix[newY][newX] = PREDATOR;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (grazerObj.x == newX && grazerObj.y == newY) {
                    grazerArr.splice(i, 3);
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
        if (this.withoutEat >= 8) {
            matrix[this.y][this.x] = EMPTY;
            for (let i = 0; i < predatorArr.length; i++) {
                const predatorObj = predatorArr[i];
                if (predatorObj.x == this.x && predatorObj.y == this.y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }

    mul() {
        if (this.rounds >= 5) {
            let emptyFields = this.chooseCell(EMPTY);
            if (emptyFields.length > 0) {
                let theChosenField =
                    emptyFields[Math.floor(Math.random() * emptyFields.length)];
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let predatorObj = new Predator(newX, newY);
                predatorArr.push(predatorObj);
                matrix[newY][newX] = PREDATOR;
            }
        }
    }
};
