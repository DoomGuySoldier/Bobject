const { CELL: { EMPTY, GRASS, GRAZER } } = require("./constants.js");
const livingCreatures = require("./livingCreatures.js");

module.exports = class Grazer extends livingCreatures{
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
            let newPos = emptyFields[Math.floor(Math.random() * emptyFields.length)]
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[newY][newX] = GRAZER;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        //finde etwas zu fressen
        let grassFields = this.chooseCell(GRASS);
        if (grassFields.length > 0) {
            let grassPos = grassFields[Math.floor(Math.random() * grassFields.length)]
            let newX = grassPos[0];
            let newY = grassPos[1];
            matrix[newY][newX] = GRAZER;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < grassArr.length; i++) {
                let grasObj = grassArr[i];
                if (grasObj.x == newX && grasObj.y == newY) {
                    grassArr.splice(i, 1);
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
        if (this.withoutEat >= 5) {
            matrix[this.y][this.x] = EMPTY;
            for (let i = 0; i < grazerArr.length; i++) {
                const grazerObj = grazerArr[i];
                if (grazerObj.x == this.x && grazerObj.y == this.y) {
                    grazerArr.splice(i, 1);
                }
            }
        }
    }

    mul() {
        if (this.rounds >= 5) {
            let emptyFields = this.chooseCell(EMPTY);
            if (emptyFields.length > 0) {
                let theChosenField =  emptyFields[Math.floor(Math.random() * emptyFields.length)] //Math.floor(Math.random() * emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grazerObj = new Grazer(newX, newY);
                grazerArr.push(grazerObj);
                matrix[newY][newX] = GRAZER;
            }
        }
    }
}