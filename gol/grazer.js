const livingCreatures = require("./livingCreatures.js");

module.exports = class Grazer extends livingCreatures{
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.eatCounter = 0;
        this.withoutEat = 0;
        // this.color = "yellow";
        // this.index = 2;
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
            let newPos = emptyFields[Math.floor(Math.random() * emptyFields.length)]
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        //finde etwas zu fressen

        let grassFields = this.chooseCell(1);
        if (grassFields.length > 0) {
            let grassPos = grassFields[Math.floor(Math.random() * grassFields.length)]
            let newX = grassPos[0];
            let newY = grassPos[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
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
            matrix[this.y][this.x] = 0;
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
            let emptyFields = this.chooseCell(0);
            if (emptyFields.length > 0) {
                let theChosenField =  emptyFields[Math.floor(Math.random() * emptyFields.length)] //Math.floor(Math.random() * emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grazerObj = new Grazer(newX, newY);
                grazerArr.push(grazerObj);
                matrix[newY][newX] = 2;
            }
        }
    }
}