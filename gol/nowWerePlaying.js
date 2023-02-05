const {
    CELL: { EMPTY, GRASS, GRAZER, PREDATOR, ALPHAMALE, BANELING },
    WEATHER: { SUNNY, CLOUDY, HEATWAVE, RAINY },
    WEATHER_DURATION,
} = require("./constants.js");

const Grass = require("./grass.js");
const Grazer = require("./grazer.js");
const Predator = require("./predator.js");
const Baneling = require("./baneling.js");
const AlphaMale = require("./alphaMale.js");
// const Spawn = require("./spawn.js");

const { getNeighbors3x3WithMe } = require("./utilities.js");

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

//---------------------------------------------------------------------------
// App configuration
//---------------------------------------------------------------------------

const CELLS = [EMPTY, GRASS, GRAZER, PREDATOR, ALPHAMALE, BANELING];
const LIVING_CREATURES = [GRASS, GRAZER, PREDATOR, ALPHAMALE, BANELING];
const WEATHER_STATES = [SUNNY, CLOUDY, HEATWAVE, RAINY];

const MATRIX_SIZE = 50;
const TIMER_INCREMENT = 300;
const WEATHER_CHANGE_PERIOD = 5000;
const CREATURES_TIME_COUNTER = {
    [GRASS]: 0,
    [GRAZER]: 0,
    [PREDATOR]: 0,
    [ALPHAMALE]: 0,
    [BANELING]: 0,
};

//unendlich wiederholdend aufgerufen
const CREATURE_UPDATE = {
    [GRASS]: function () {
        for (let grass of grassArr) {
            grass.mul();
        }
        console.log("grass updated");
    },

    [GRAZER]: function () {
        for (let grazer of grazerArr) {
            grazer.eat();
            grazer.mul();
        }
        console.log("grazer updated");
    },

    [PREDATOR]: function () {
        for (let predator of predatorArr) {
            predator.eat();
            predator.mul();
        }
        console.log("predator updated");
    },

    [ALPHAMALE]: function () {
        for (let alphaMale of AlphaMaleArr) {
            alphaMale.eat();
            alphaMale.mul();
        }
        console.log("alphaMale updated");
    },

    [BANELING]: function () {
        for (let baneling of BanelingArr) {
            baneling.move();
            baneling.suicide();
        }
        console.log("baneling updated");
    },
};

//---------------------------------------------------------------------------
// Variables
//---------------------------------------------------------------------------

let weatherState = SUNNY;
let weaterTimeCounter = 0;

matrix = [];
grassArr = [];
grazerArr = [];
predatorArr = [];
AlphaMaleArr = [];
BanelingArr = [];
died = [];

//---------------------------------------------------------------------------
// Functions
//---------------------------------------------------------------------------

function createRandomMatrix(w, h) {
    let mtrx = [];

    for (let y = 0; y < h; y++) {
        let array = [];
        mtrx[y] = array;
        for (let x = 0; x < w; x++) {
            const i = Math.floor(Math.random() * CELLS.length);
            mtrx[y][x] = CELLS[i];
        }
    }

    return mtrx;
}

function getWeatherState() {
    return WEATHER_STATES[Math.floor(Math.random() * WEATHER_STATES.length)];
}

function setCreatures() {
    grassArr = [];
    grazerArr = [];
    predatorArr = [];
    AlphaMaleArr = [];
    BanelingArr = [];

    for (let y in matrix) {
        y = parseInt(y);
        for (let x in matrix[y]) {
            x = parseInt(x);
            if (matrix[y][x] === GRASS) {
                let grassObj = new Grass(x, y);
                grassArr.push(grassObj);
            } else if (matrix[y][x] === GRAZER) {
                let grazerObj = new Grazer(x, y);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] === PREDATOR) {
                let predatorObj = new Predator(x, y);
                predatorArr.push(predatorObj);
            } else if (matrix[y][x] === ALPHAMALE) {
                let alphaMaleObj = new AlphaMale(x, y);
                AlphaMaleArr.push(alphaMaleObj);
            } else if (matrix[y][x] === BANELING) {
                let banelingObj = new Baneling(x, y);
                BanelingArr.push(banelingObj);
            }
        }
    }
}

function gameStarter() {
    matrix = createRandomMatrix(MATRIX_SIZE, MATRIX_SIZE);
    setCreatures();
}

function spawn(cell) {
    console.log("Beam me up, Scottie...");
    const x = Math.floor(Math.random() * MATRIX_SIZE);
    const y = Math.floor(Math.random() * MATRIX_SIZE);
    const spawnPlaces = getNeighbors3x3WithMe(x, y);

    for (let i = 0; i < spawnPlaces.length; i++) {
        const pos = spawnPlaces[i];
        let posX = pos[0];
        let posY = pos[1];
        if (
            posX >= 0 &&
            posX < matrix[0].length &&
            posY >= 0 &&
            posY < matrix.length
        ) {
            matrix[posY][posX] = cell;
        }
    }

    // New spawn — no more die!
    died = died.filter((creature) => creature !== cell);
}

function doAccident() {
    console.log("Housten, we may have a problem...");
    spawn(EMPTY);
    setCreatures();
    doEmit();
}

function doSpawnGrazer() {
    console.log("Spawn grazer...");
    spawn(GRAZER);
    setCreatures();
    doEmit();
}

function doSpawnGrass() {
    console.log("Spawn grass...");
    spawn(GRASS);
    setCreatures();
    doEmit();
}

function setDiedByWeatherState(state) {
    if (weatherState === state) {
        const i = Math.floor(Math.random() * LIVING_CREATURES.length);
        const creatureToDie = LIVING_CREATURES[i];

        if (!died.includes(creatureToDie)) {
            died.push(creatureToDie);
        }

        for (let y in matrix) {
            y = parseInt(y);
            for (let x in matrix[y]) {
                x = parseInt(x);
                if (died.includes(matrix[y][x])) {
                    matrix[y][x] = EMPTY;
                }
            }
        }

        setCreatures();
    }
}

function weatherUpdate() {
    weaterTimeCounter += TIMER_INCREMENT;
    if (weaterTimeCounter >= WEATHER_CHANGE_PERIOD) {
        weaterTimeCounter = 0;
        weatherState = getWeatherState();
        setDiedByWeatherState(HEATWAVE);
        console.log("es ist: ", weatherState);
    }
}

function creaturesUpdate() {
    for (let creature of LIVING_CREATURES) {
        CREATURES_TIME_COUNTER[creature] += TIMER_INCREMENT;
        if (
            CREATURES_TIME_COUNTER[creature] >=
            WEATHER_DURATION[creature][weatherState]
        ) {
            CREATURES_TIME_COUNTER[creature] = 0;
            CREATURE_UPDATE[creature]();
        }
    }
}

function doEmit() {
    io.emit("weatherState", weatherState);
    io.emit("send matrix", matrix);
    io.emit("who died", died);
}

function gameUpdater() {
    weatherUpdate();
    creaturesUpdate();
    doEmit();
}

io.on("connection", function (socket) {
    console.log("client ws connection established...");
    io.emit("send matrix", matrix);
    socket.on("accident", doAccident);
    socket.on("spawnGrazer", doSpawnGrazer);
    socket.on("spawnGrass", doSpawnGrass);
});

httpServer.listen(3000, function () {
    console.log("Terminator activated");
    gameStarter();
    setInterval(gameUpdater, TIMER_INCREMENT);
});
