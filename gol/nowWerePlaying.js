const {
    CELL: { EMPTY, GRASS, GRAZER, PREDATOR, ALPHAMALE, BANELING },
    WEATHER: { SUNNY, CLOUDY, HEATWAVE, RAINY },
    WEATHER_DURATION
} = require("./constants.js");

const Grass = require("./grass.js");
const Grazer = require("./grazer.js");
const Predator = require("./predator.js");
const Baneling = require("./baneling.js");
const AlphaMale = require("./alphaMale.js");
const Spawn = require("./spawn.js");

const express = require("express");
const app = express();

let httpServer = require("http").Server(app);
let { Server } = require("socket.io");
const io = new Server(httpServer);

app.use(express.static("./"));
app.get("./", function (req, resp) {
    resp.redirect("index.html");
});

// matrix = [
//     [0, 0, 1, 0, 0],
//     [1, 0, 0, 0, 0],
//     [0, 1, 0, 3, 0],
//     [0, 0, 1, 0, 0],
//     [1, 1, 0, 0, 0],
//     [1, 1, 0, 2, 0],
//     [1, 1, 0, 0, 0]
// ];

const CELLS = [EMPTY, GRASS, GRAZER, PREDATOR, ALPHAMALE, BANELING];
const WEATHER_STATES = [SUNNY, CLOUDY, HEATWAVE, RAINY];
const MATRIX_SIZE = 50;

function createRandomMatrix(w, h) {
    let matrix = [];

    for (let y = 0; y < h; y++) {
        let array = [];
        matrix[y] = array;
        for (let x = 0; x < w; x++) {
            const i = Math.floor(Math.random() * CELLS.length);
            matrix[y][x] = CELLS[i];
        }
    }

    return matrix;
}

let weatherState = SUNNY;
let grassInterval;
let grazerInterval;
let predatorInterval;
let alphaMaleInterval;
let banelingInterval;

grassArr = [];
grazerArr = [];
predatorArr = [];
AlphaMaleArr = [];
BanelingArr = [];
died = [];

function getWeatherState() {
    return WEATHER_STATES[Math.floor(Math.random() * WEATHER_STATES.length)];
}

function setSymbols() {
    for (let y in matrix) {
        y = parseInt(y);
        for (let x in matrix[y]) {
            x = parseInt(x);
            if (matrix[y][x] == GRASS) {
                let grassObj = new Grass(x, y);
                grassArr.push(grassObj);
            } else if (matrix[y][x] == GRAZER) {
                let grazerObj = new Grazer(x, y);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] == PREDATOR) {
                let predatorObj = new Predator(x, y);
                predatorArr.push(predatorObj);
            } else if (matrix[y][x] == ALPHAMALE) {
                let alphaMaleObj = new AlphaMale(x, y);
                AlphaMaleArr.push(alphaMaleObj);
            } else if (matrix[y][x] == BANELING) {
                let banelingObj = new Baneling(x, y);
                BanelingArr.push(banelingObj);
            }
        }
    }
}

function gameStarter() {
    matrix = createRandomMatrix(MATRIX_SIZE, MATRIX_SIZE);
    setSymbols();
}

//unendlich wiederholdend aufgerufen
function grassUpdater() {
    for (let grass of grassArr) {
        grass.mul();
    }
    console.log("grass updated");
    io.emit("send matrix", matrix);
}

function grazerUpdater() {
    for (let grazer of grazerArr) {
        grazer.eat();
        grazer.mul();
    }
    console.log("grazer updated");
    io.emit("send matrix", matrix);
}

function predatorUpdater() {
    for (let predator of predatorArr) {
        predator.eat();
        predator.mul();
    }
    console.log("predator updated");
    io.emit("send matrix", matrix);
}

function alphaMaleUpdater() {
    for (let alphaMale of AlphaMaleArr) {
        alphaMale.eat();
        alphaMale.mul();
    }
    console.log("alphaMale updated");
    io.emit("send matrix", matrix);
}

function banelingUpdater() {
    for (let baneling of BanelingArr) {
        baneling.move();
        baneling.suicide();
    }
    console.log("baneling updated");
    io.emit("send matrix", matrix);
}

function runIntervals(weatherState) {
    if (grassInterval) {
        clearInterval(grassInterval);
    }

    if (!died.includes(GRASS)) {
        grassInterval = setInterval(function () {
            grassUpdater();
        }, WEATHER_DURATION[GRASS][weatherState]);
    }

    //------------------------------------

    if (grazerInterval) {
        clearInterval(grazerInterval);
    }

    if (!died.includes(GRAZER)){
        grazerInterval = setInterval(function () {
            grazerUpdater();
        }, WEATHER_DURATION[GRAZER][weatherState]);    
    }

    //------------------------------------

    if (predatorInterval) {
        clearInterval(predatorInterval);
    }

    if (!died.includes(PREDATOR)){
        predatorInterval = setInterval(function () {
            predatorUpdater();
        }, WEATHER_DURATION[PREDATOR][weatherState]);    
    }

    //------------------------------------

    if (alphaMaleInterval) {
        clearInterval(alphaMaleInterval);
    }

    if (!died.includes(ALPHAMALE)){
        alphaMaleInterval = setInterval(function () {
            alphaMaleUpdater();
        }, WEATHER_DURATION[ALPHAMALE][weatherState]);   
    }

    //------------------------------------

    if (banelingInterval) {
        clearInterval(banelingInterval);
    }

    if (!died.includes(BANELING)){
        banelingInterval = setInterval(function () {
            banelingUpdater();
        }, WEATHER_DURATION[BANELING][weatherState]);    
    }
}

function doAccident() {
    console.log("Housten, we may have a problem...")
    const spawn = new Spawn(EMPTY, MATRIX_SIZE);
    spawn.execute();
    setSymbols();
    io.emit("send matrix", matrix);
}

function doSpawnGrazer() {
    console.log("Spawn grazer...")
    const spawn = new Spawn(GRAZER, MATRIX_SIZE);
    spawn.execute();
    setSymbols();
    io.emit("send matrix", matrix);
}

function setDied() {
    if (weatherState === HEATWAVE) {
        const diedCell = Math.floor(Math.random() * CELLS.length);

        if (!died.includes(diedCell)) {
            died.push(diedCell);

            for (let y in matrix) {
                for (let x in matrix[y]) {
                    if (died.includes(matrix[y][x])) {
                        matrix[y][x] = EMPTY;
                    }
                }
            }

            setSymbols();
        }
    }
}

io.on("connection", function (socket) {
    console.log("client ws connection established...");
    io.emit("send matrix", matrix);
    socket.on("accident", doAccident);
    socket.on("spawnGrazer", doSpawnGrazer);
})

httpServer.listen(3000, function () {
    console.log("Terminator activated");
    gameStarter();
    runIntervals(weatherState);
    setInterval(function() {
        weatherState = getWeatherState();
        setDied();
        runIntervals(weatherState);
        io.emit("weatherState", weatherState);
        console.log("es ist: ", weatherState);
    }, 10000)
});