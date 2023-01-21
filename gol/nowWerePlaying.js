const Grass = require("./grass.js");
const Grazer = require("./grazer.js");
const Predator = require("./predator.js");
const Baneling = require("./baneling.js");
const AlphaMale = require("./alphaMale.js");


matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
];

function createRandomMatrix(w, h) {
    let matrix = [];
    for (let y = 0; y < h; y++) {
        let array = [];
        matrix[y] = array;
        for (let x = 0; x < w; x++) {
            matrix[y][x] = Math.floor(Math.random() * 5);
        }
    }
    return matrix;
}

//let side = 50;
//let fr = 5;

//Lebewesenliste
grassArr = [];
grazerArr = [];
predatorArr = [];
AlphaMaleArr = [];
BanelingArr = [];

function gameStarter() {
    matrix = createRandomMatrix(50, 50);

    for(let y in matrix){
        y = parseInt(y);
        for(let x in matrix[y]){
            x = parseInt(x);
            if (matrix[y][x] == 1){
                let grassObj = new Grass(x, y);
                grassArr.push(grassObj);
            } else if (matrix[y][x] == 2){
                let grazerObj = new Grazer(x, y);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] == 3){
                let predatorObj = new Predator(x, y);
                predatorArr.push(predatorObj);
            } else if (matrix[y][x] == 4){
                let alphaMaleObj = new AlphaMale(x, y);
                AlphaMaleArr.push(alphaMaleObj);
            } else if (matrix[y][x] == 5){
                let banelingObj = new Baneling(x, y);
                BanelingArr.push(banelingObj);
            }
        }
    }
}

//unendlich wiederholdend aufgerufen
function updater() {

    for (let i in grassArr) {
        i = parseInt(i);
        let grassObj = grassArr[i];
        grassObj.mul();
    }

    for (let i in grazerArr) {
        i = parseInt(i);
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();
    }

    for (let i in predatorArr) {
        i = parseInt(i);
        let predator = predatorArr[i];
        predator.eat();
        predator.mul();
    }

    for (let i in AlphaMaleArr) {
        i = parseInt(i);
        let AlphaMale = AlphaMaleArr[i];
        AlphaMale.eat();
        AlphaMale.mul();
    }

    for (let i in BanelingArr) {
        i = parseInt(i);
        let Baneling = BanelingArr[i];
        Baneling.suicide();
    }

    console.log(matrix);
}

gameStarter();
setInterval(function () {
    updater();
}, 100);