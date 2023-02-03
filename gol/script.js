const { EMPTY, GRASS, GRAZER, PREDATOR, ALPHAMALE, BANELING } = CELL;
const { SUNNY, CLOUDY, HEATWAVE, RAINY } = WEATHER;

const MESSAGES = {
   [SUNNY]: "Let's go to the beach...",
   [CLOUDY]: "Where is my damn flashlight?",
   [HEATWAVE]: "Why do I here boss music?",
   [RAINY]: "Today anybody gonna do nothing..."
}

let matrix = [[]];
let side = 10;
let matrixSize = 50;
let weatherState = SUNNY;
let socket = io();

function main() {
   socket.on("send matrix", drawMatrix);
   socket.on("weatherState", onWeatherState);

   let killBtn = document.getElementById("killButton");
   killBtn.addEventListener("click", crash);

   let spawnBtn = document.getElementById("spawnGrazerButton");
   spawnBtn.addEventListener("click", spawnGrazer);

   showWeatherStateMessage();
}

function onWeatherState(state) {
   weatherState = state;
   showWeatherStateMessage();
}

function showWeatherStateMessage() {
   let weatherStateMessage = document.getElementById("weatherStateMessage");
   weatherStateMessage.innerText = MESSAGES[weatherState];
}

function crash(event) {
   console.log("Housten, we may have a problem...");
   socket.emit("accident");
}

function spawnGrazer(event) {
   console.log("Spawn Grazer...");
   socket.emit("spawnGrazer");
}

// einmal aufgerufen
function setup() {
   createCanvas(matrixSize * side + 1, matrixSize * side + 1);
   background("#acacac");
}

//unendlich wiederholdend aufgerufen
function drawMatrix(matrix) {
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
         const cell = matrix[y][x];
         const cellWeatherColors = WEATHER_COLOR[cell];
         const color = cellWeatherColors[weatherState];
         fill(color);
         rect(x * side, y * side, side, side);
      }
   }
}

window.onload = main;