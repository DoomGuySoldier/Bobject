//Gras-Klasse
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rounds = 0;
        // this.color = "green";
        // this.index = 1;
        this.neighbors=[
            [this.x-1, this.y-1],
            [this.x, this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ]
    }
    chooseCell(symbol) {
        let found = [];
        // wir suchen nach leeren Feldern - Wert 0
        for(let i = 0; i<this.neighbors.length; i++) {
            const pos = this.neighbors[i];  //[x,y]
            let posX = pos[0];
            let posY = pos[1];

            if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                let wert = matrix[posY][posX];
                if(wert == symbol) {
                    found.push(pos);
                }
            }
            
        }
        return found;
    }
    mul() {
        this.rounds++;
        //console.log("grass mul", this.rounds);
        if(this.rounds >= 4) {
            let emptyFields = this.chooseCell(0);
            if(emptyFields.length > 0) {
                let theChosenField = random(emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grasObj = new Grass(newX, newY);
                grassArr.push(grasObj);

                matrix[newY][newX] = 1;
            }
            this.rounds = 0;
        }
    }
}



class Grazer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.eatCounter = 0;
        this.withoutEat = 0;
        // this.color = "yellow";
        // this.index = 2;
        this.neighbors=[
            [this.x-1, this.y-1],
            [this.x,   this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x,   this.y+1],
            [this.x+1, this.y+1]
        ]
    }

    updateNeighbors() {
        this.neighbors=[
            [this.x-1, this.y-1],
            [this.x,   this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x,   this.y+1],
            [this.x+1, this.y+1]
        ];
    }

    chooseCell(symbol) {
        this.updateNeighbors();
        let found = [];
        // wir suchen nach leeren Feldern - Wert x
        for(let i = 0; i<this.neighbors.length; i++) {
            const pos = this.neighbors[i];  //[x,y]
            let posX = pos[0];
            let posY = pos[1];

            if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                let wert = matrix[posY][posX];
                if(wert == symbol) {
                    found.push(pos);
                }
            }
            
        }
        return found;
    }
    move() {
        //console.log("Grasfresser bewegung");
        let emptyFields = this.chooseCell(0);
        if(emptyFields.length > 0) {
            let newPos = random(emptyFields);
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
        if(grassFields.length > 0) {
            let grassPos = random(grassFields);
            let newX = grassPos[0];
            let newY = grassPos[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for(let i=0; i < grassArr.length; i++) {
                let grasObj = grassArr[i];
                if(grasObj.x == newX && grasObj.y == newY) {
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
        if (this.withoutEat >= 5){
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < grazerArr.length; i++) {
                const grazerObj = grazerArr[i];
                if (grazerObj.x == this.x && grazerObj.y == this.y){
                    grazerArr.splice(i, 1);
                }
                
            }
            
        }
    }

    mul() {
        
        if(this.rounds >= 5) {
            let emptyFields = this.chooseCell(0);
            if(emptyFields.length > 0) {
                let theChosenField = random(emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let grazerObj = new Grazer(newX, newY);
                grazerArr.push(grazerObj);
                matrix[newY][newX] = 2;
            }
        }
    }
}

class Predator{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.eatCounter = 0;
        this.withoutEat = 0;
        this.neighbors=[
            [this.x-1, this.y-1],
            [this.x,   this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x,   this.y+1],
            [this.x+1, this.y+1]
        ]
    }

    updateNeighbors() {
        this.neighbors=[
            [this.x-1, this.y-1],
            [this.x,   this.y-1],
            [this.x+1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x,   this.y+1],
            [this.x+1, this.y+1]
        ];
    }

    chooseCell(symbol) {
        this.updateNeighbors();
        let found = [];
        // wir suchen nach leeren Feldern - Wert x
        for(let i = 0; i<this.neighbors.length; i++) {
            const pos = this.neighbors[i];  //[x,y]
            let posX = pos[0];
            let posY = pos[1];

            if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                let wert = matrix[posY][posX];
                if(wert == symbol) {
                    found.push(pos);
                }
            }
            
        }
        return found;
    }

    move() {
        //console.log("Grasfresser bewegung");
        let emptyFields = this.chooseCell(0);
        if(emptyFields.length > 0) {
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
        if(grazerFields.length > 0) {
            let grazerPos = random(grazerFields);
            let newX = grazerPos[0];
            let newY = grazerPos[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for(let i=0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if(grazerObj.x == newX && grazerObj.y == newY) {
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
        if (this.withoutEat >= 8){
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < predatorArr.length; i++) {
                const predatorObj = predatorArr[i];
                if (predatorObj.x == this.x && predatorObj.y == this.y){
                    predatorArr.splice(i, 1);
                }
                
            }
            
        }
    }

    mul() {
        
        if(this.rounds >= 5) {
            let emptyFields = this.chooseCell(0);
            if(emptyFields.length > 0) {
                let theChosenField = random(emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let predatorObj = new Predator(newX, newY);
                predatorArr.push(predatorObj);
                matrix[newY][newX] = 3;
            }
        }
    }

}

// class AlphaMale{
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//         this.eatCounter = 0;
//         this.withoutEat = 0;
//         this.neighbors=[
//             [this.x-1, this.y-1],
//             [this.x,   this.y-1],
//             [this.x+1, this.y-1],
//             [this.x-1, this.y],
//             [this.x+1, this.y],
//             [this.x-1, this.y+1],
//             [this.x,   this.y+1],
//             [this.x+1, this.y+1]
//         ]
//     }

//     updateNeighbors() {
//         this.neighbors=[
//             [this.x-1, this.y-1],
//             [this.x,   this.y-1],
//             [this.x+1, this.y-1],
//             [this.x-1, this.y],
//             [this.x+1, this.y],
//             [this.x-1, this.y+1],
//             [this.x,   this.y+1],
//             [this.x+1, this.y+1]
//         ];
//     }

//     chooseCell(symbol) {
//         this.updateNeighbors();
//         let found = [];
//         // wir suchen nach leeren Feldern - Wert x
//         for(let i = 0; i<this.neighbors.length; i++) {
//             const pos = this.neighbors[i];  //[x,y]
//             let posX = pos[0];
//             let posY = pos[1];

//             if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
//                 let wert = matrix[posY][posX];
//                 if(wert == symbol) {
//                     found.push(pos);
//                 }
//             }
            
//         }
//         return found;
//     }

//     move() {
//         //console.log("Grasfresser bewegung");
//         let emptyFields = this.chooseCell(0);
//         if(emptyFields.length > 0) {
//             let newPos = random(emptyFields);
//             let newX = newPos[0];
//             let newY = newPos[1];
//             matrix[newY][newX] = 4;
//             matrix[this.y][this.x] = 0;
//             this.x = newX;
//             this.y = newY;
//         }  
        
//     }

//     eat() {
//         //finde etwas zu fressen

//         let predatorFields = this.chooseCell(3);
//         if(predatorsFields.length > 0) {
//             let predatorPos = random(predatorFields);
//             let newX = predatorPos[0];
//             let newY = predatorPos[1];
//             matrix[newY][newX] = 4;
//             matrix[this.y][this.x] = 0;
//             this.x = newX;
//             this.y = newY;

//             for(let i=0; i < predatorArr.length; i++) {
//                 let predatorObj = predatorArr[i];
//                 if(predatorObj.x == newX && predatorObj.y == newY) {
//                     predatorArr.splice(i, 1);
//                 }
//             }

//             // eatCounter erhöhen
//             this.eatCounter++;
//             this.withoutEat = 0;
//         } else {
//             //wenn nix zu fressen da ist
//             this.eatCounter = 0;
//             this.withoutEat++;
//             this.move();
//             this.die();
//         }

        
//     }

//     die() {
//         if (this.withoutEat >= 10){
//             matrix[this.y][this.x] = 0;
//             for (let i = 0; i < AlphaMaleArr.length; i++) {
//                 const AlphaMaleObj = AlphaMaleArr[i];
//                 if (AlphaMaleObj.x == this.x && AlphaMaleObj.y == this.y){
//                     AlphaMaleArr.splice(i, 1);
//                 }
                
//             }
            
//         }
//     }

//     mul() {
        
//         if(this.rounds >= 10) {
//             let emptyFields = this.chooseCell(0);
//             if(emptyFields.length > 0) {
//                 let theChosenField = random(emptyFields);
//                 let newX = theChosenField[0];
//                 let newY = theChosenField[1];
//                 let AlphaMaleObj = new AlphaMale(newX, newY);
//                 AlphaMaleArr.push(AlphaMaleObj);
//                 matrix[newY][newX] = 4;
//             }
//         }
//     }
// }

// class Baneling{
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//         this.eatCounter = 0;
//         this.withoutEat = 0;
//         this.neighbors=[
//             [this.x-1, this.y-1],
//             [this.x,   this.y-1],
//             [this.x+1, this.y-1],
//             [this.x-1, this.y],
//             [this.x+1, this.y],
//             [this.x-1, this.y+1],
//             [this.x,   this.y+1],
//             [this.x+1, this.y+1]
//         ]
//     }

//     updateNeighbors() {
//         this.neighbors=[
//             [this.x-1, this.y-1],
//             [this.x,   this.y-1],
//             [this.x+1, this.y-1],
//             [this.x-1, this.y],
//             [this.x+1, this.y],
//             [this.x-1, this.y+1],
//             [this.x,   this.y+1],
//             [this.x+1, this.y+1]
//         ];
//     }

//     chooseCell(symbol) {
//         this.updateNeighbors();
//         let found = [];
//         // wir suchen nach leeren Feldern - Wert x
//         for(let i = 0; i<this.neighbors.length; i++) {
//             const pos = this.neighbors[i];  //[x,y]
//             let posX = pos[0];
//             let posY = pos[1];

//             if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
//                 let wert = matrix[posY][posX];
//                 if(wert == symbol) {
//                     found.push(pos);
//                 }
//             }
            
//         }
//         return found;
//     }

//     move() {
//         //console.log("Grasfresser bewegung");
//         let emptyFields = this.chooseCell(0);
//         if(emptyFields.length > 0) {
//             let newPos = random(emptyFields);
//             let newX = newPos[0];
//             let newY = newPos[1];
//             matrix[newY][newX] = 5;
//             matrix[this.y][this.x] = 0;
//             this.x = newX;
//             this.y = newY;
//         }  
        
//     }

//     suiciede() {
//         //finde etwas zu fressen

//         let AlphaMaleFields = this.chooseCell(4);
//         if(AlphaMaleFields.length > 0) {
//             let AlphaMalePos = random(AlphaMaleFields);
//             let newX = AlphaMalePos[0];
//             let newY = AlphaMalePos[1];
//             matrix[newY][newX] = 5;
//             matrix[this.y][this.x] = 0;
//             this.x = newX;
//             this.y = newY;

//             for(let i=0; i < AlphaMaleArr.length; i++) {
//                 let AlphaMaleObj = AlphaMaleArr[i];
//                 if(AlphaMaleObj.x == newX && AlphaMaleObj.y == newY) {
//                     for(let i = 0; this.neighbors.length >= 8; i++){
//                         AlphaMaleArr.splice(i, 1);
//                         grassArr.splice(i, 1);
//                         grazerArr.splice(i, 1);
//                         predatorArr.splice(i, 1);
//                     }
//                 }
//             }

//             // eatCounter erhöhen
//             this.eatCounter++;
//             this.withoutEat = 0;
//         } else {
//             //wenn nix zu fressen da ist
//             this.eatCounter = 0;
//             this.withoutEat++;
//             this.move();
//             this.die();
//         }

        
//     }

//     die() {
//         if (this.withoutEat >= 15){
//             matrix[this.y][this.x] = 0;
//             for (let i = 0; i < BanelingArr.length; i++) {
//                 const BanelingObj = BanelingArr[i];
//                 if (BanelingObj.x == this.x && BanelingObj.y == this.y){
//                     BanelingArr.splice(i, 1);
//                 }
                
//             }
            
//         }
//     }
// }