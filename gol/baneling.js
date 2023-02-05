const {
    CELL: { EMPTY, BANELING, ALPHAMALE },
} = require("./constants.js");
const livingCreatures = require("./livingCreatures.js");

module.exports = class Baneling extends livingCreatures {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
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
            let AlphaMalePos =
                AlphaMaleFields[
                    Math.floor(Math.random() * AlphaMaleFields.length)
                ]; //random(AlphaMaleFields);
            let newX = AlphaMalePos[0];
            let newY = AlphaMalePos[1];
            matrix[newY][newX] = EMPTY;
            matrix[this.y][this.x] = EMPTY;
            this.x = newX;
            this.y = newY;
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
};
