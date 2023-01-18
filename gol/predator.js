const livingCreatures = require("./livingCreatures.js");

module.exports = class Predator extends livingCreatures{
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.eatCounter = 0;
        this.withoutEat = 0;
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

    updateNeighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(symbol) {
        this.updateNeighbors();
        let found = [];
        // wir suchen nach leeren Feldern - Wert x
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

    move() {
        //console.log("Grasfresser bewegung");
        let emptyFields = this.chooseCell(0);
        if (emptyFields.length > 0) {
            let newPos = random(emptyFields);
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        //finde etwas zu fressen

        let grazerFields = this.chooseCell(2);
        if (grazerFields.length > 0) {
            let grazerPos = random(grazerFields);
            let newX = grazerPos[0];
            let newY = grazerPos[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
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
            matrix[this.y][this.x] = 0;
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
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0) {
                let theChosenField = Math.floor(Math.random() * emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let predatorObj = new Predator(newX, newY);
                predatorArr.push(predatorObj);
                matrix[newY][newX] = 3;
            }
        }
    }

}