//const { CELL } = require("constants.js");
// import constants from "./constants";

const { EMPTY, GRASS, GRAZER, PREDATOR, ALPHAMALE, BANELING } = CELL;
const { SUNNY, CLOUDY, HEATWAVE, RAINY } = WEATHER;

const MESSAGES = {
   [SUNNY]: "Is super sunny now!",
   [CLOUDY]: "Clouds, clouds ...",
   [HEATWAVE]: "Heat! Wave!",
   [RAINY]: "Shhhhh..."
}

let matrix = [[]];
let side = 10;
let matrixSize = 50;
// let isRaining = false;
let weatherState = SUNNY;

let socket = io();

function main() {
   socket.on("send matrix", drawMatrix);
   // socket.on("isRaining", Nestle);
   socket.on("weatherState", onWeatherState);

   let MyKillBtn = document.getElementById("killButton");
   MyKillBtn.addEventListener("click", kamikaze);

   showWeatherStateMessage();
}

function onWeatherState(state) {
   weatherState = state;
   showWeatherStateMessage();
}

// function Nestle(data){
//    // console.log("Regnet es: ", data);
//    isRaining = data;
// }

function showWeatherStateMessage() {
   let weatherStateMessage = document.getElementById("weatherStateMessage");
   weatherStateMessage.innerText = MESSAGES[weatherState];
}

function kamikaze(event) {
   console.log("Japse unterwegs...");
   socket.emit("suicide", 10);
}

// einmal aufgerufen
function setup() {
   createCanvas(matrixSize * side + 1, matrixSize * side + 1);
   background("#acacac");
}

//unendlich wiederholdend aufgerufen
/*
function drawMatrix(matrix) {
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == EMPTY) {
            fill('white');
         } else if (matrix[y][x] == GRASS) {
            fill('green');
            // if(isRaining){
            //    fill("blue");
            // }
         } else if (matrix[y][x] == GRAZER) {
            fill('yellow');
         } else if (matrix[y][x] == PREDATOR) {
            fill('red');
         }
         //  }else if(matrix[y][x] == ALPHAMALE) {
         //    fill('purple');
         //  }else if(matrix[y][x] == BANELING) {
         //    fill('black');
         //  }

         rect(x * side, y * side, side, side);
      }
   }
}
*/

function drawMatrix(matrix) {
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
         const cell = matrix[y][x];
         const cellWeatherColors = WEATHER_COLOR[cell];
         const color = cellWeatherColors[weatherState];
         fill(weatherState);
         rect(x * side, y * side, side, side);
      }
   }
}

const a = { a1: { nm: "asdsd" }, v5: 7};
a.a1.nm
a["a1"]["nm"]

window.onload = main;