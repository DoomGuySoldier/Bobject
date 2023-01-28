let matrix = [[]];
let side = 10;
let matrixSize = 50;
let isRaining = false;

let socket = io();

function main(){
   socket.on("send matrix", drawMatrix);
   socket.on("isRaining", Nestle);

   let MyKillBtn = document.getElementById("killButton");
   MyKillBtn.addEventListener("click", kamikaze);
}

function Nestle(data){
   console.log("Regnet es: ", data);
   isRaining = data;
}

function kamikaze(event){
   console.log("Japse unterwegs...");
   socket.emit("suicide", 10);
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
         if (matrix[y][x] == 0) {
            fill('white');
         } else if (matrix[y][x] == 1) {
            fill('green');
            if(isRaining){
               fill("blue");
            }
         } else if (matrix[y][x] == 2) {
            fill('yellow');
         } else if (matrix[y][x] == 3) {
            fill('red');
         }
         //  }else if(matrix[y][x] == 4) {
         //    fill('purple');
         //  }else if(matrix[y][x] == 5) {
         //    fill('black');
         //  }

         rect(x * side, y * side, side, side);
      }
   }
}

window.onload = main;