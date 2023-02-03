const { CELL: { EMPTY, BANELING, ALPHAMALE } } = require("./constants.js");
const livingCreatures = require("./livingCreatures.js");

module.exports = class Baneling extends livingCreatures{
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
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
        let emptyFields = this.chooseCell(EMPTY);
        if (emptyFields.length > 0) {
            let newPos = emptyFields[Math.floor(Math.random() * emptyFields.length)]
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[newY][newX] = BANELING;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;
        }
    }

    suicide() {
        //finde etwas zu fressen
        let AlphaMaleFields = this.chooseCell(ALPHAMALE);
        if (AlphaMaleFields.length > 0) {
            let AlphaMalePos = AlphaMaleFields[Math.floor(Math.random() * AlphaMaleFields.length)] //random(AlphaMaleFields);
            let newX = AlphaMalePos[0];
            let newY = AlphaMalePos[1];
            matrix[newY][newX] = EMPTY;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;

            // for (let i = 0; i < AlphaMaleArr.length; i++) {
            //     let AlphaMaleObj = AlphaMaleArr[i];
            //     if (AlphaMaleObj.x == newX && AlphaMaleObj.y == newY) {
            //         for (let i = 0; this.neighbors.length >= 8; i++) {
            //             AlphaMaleArr.splice(i, 1);
            //             //grassArr.splice(i, 1);
            //             //grazerArr.splice(i, 1);
            //             //predatorArr.splice(i, 1);
            //         }
            //     }
            // }


        } else {
            this.withoutEat++;
            this.move();
            this.die();
        }
    }

    die() {
        if (this.withoutEat >= 12) {
            matrix[this.y][this.x] = EMPTY;
            for (let i = 0; i < BanelingArr.length; i++) {
                const BanelingObj = BanelingArr[i];
                if (BanelingObj.x == this.x && BanelingObj.y == this.y) {
                    BanelingArr.splice(i, 1);
                }
            }
        }
    }
}