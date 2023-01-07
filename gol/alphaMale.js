class AlphaMale{
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
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }  
        
    }

    eat() {
        //finde etwas zu fressen

        let predatorFields = this.chooseCell(3);
        if(predatorsFields.length > 0) {
            let predatorPos = random(predatorFields);
            let newX = predatorPos[0];
            let newY = predatorPos[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for(let i=0; i < predatorArr.length; i++) {
                let predatorObj = predatorArr[i];
                if(predatorObj.x == newX && predatorObj.y == newY) {
                    predatorArr.splice(i, 1);
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
        if (this.withoutEat >= 10){
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < AlphaMaleArr.length; i++) {
                const AlphaMaleObj = AlphaMaleArr[i];
                if (AlphaMaleObj.x == this.x && AlphaMaleObj.y == this.y){
                    AlphaMaleArr.splice(i, 1);
                }
                
            }
            
        }
    }

    mul() {
        
        if(this.rounds >= 10) {
            let emptyFields = this.chooseCell(0);
            if(emptyFields.length > 0) {
                let theChosenField = random(emptyFields);
                let newX = theChosenField[0];
                let newY = theChosenField[1];
                let AlphaMaleObj = new AlphaMale(newX, newY);
                AlphaMaleArr.push(AlphaMaleObj);
                matrix[newY][newX] = 4;
            }
        }
    }
}