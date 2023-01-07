let matrix =[
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
 ]; 
 
 function createRandomMatrix(w, h){
     let matrix = [];
     for (let y = 0; y < h; y++){
         let array = [];
         matrix[y] = array;
         for (let x = 0; x < w; x++){
             let z = random(0, 4);
             matrix[y][x] = Math.floor(z);
         }
     }
     return matrix;
 }
 
 // let x = random(500)
 // let y = random(500)
 // let z = random(30)
 
 let side = 50;
 let fr = 5;
 
 //Lebewesenliste
 let grassArr = [];
 let grazerArr = [];
 let predatorArr = [];
 let AlphaMaleArr = [];
 let BanelingArr = [];
 
 
 // einmal aufgerufen
 function setup() {
    matrix = createRandomMatrix(50, 50);
    createCanvas(matrix[0].length*side+1, matrix.length*side+1);
    //background("#acacac");
    frameRate(3);
 
 
    let grasObj1 = new Grass(1,2);
    // console.log(grasObj1);
    // console.log(grasObj1.chooseCell(1));
 
 
    let arr = [];
    for(let y=0; y<matrix.length; y++) {
       for(let x = 0; x<matrix[y].length; x++) {
          if(matrix[y][x] == 1) {
             let grasObj = new Grass(x,y);
             grassArr.push(grasObj);
             //console.log(grasObj);
          } else if(matrix[y][x] == 2) {
             let grazerObj = new Grazer(x, y);
             grazerArr.push(grazerObj);
          } else if(matrix[y][x] == 3){
              let predatorObj = new Predator(x,y);
              predatorArr.push(predatorObj);
          }
       }
    }
    
 }
 
 //unendlich wiederholdend aufgerufen
 function draw() {
    
    //console.log(grassArr);
    //update GrassObj
    for(let i in grassArr) {
       i = parseInt(i);
       let grasObj = grassArr[i];
       grasObj.mul();
    }
    
    for(let i in grazerArr) {
       i = parseInt(i);
       let grazerObj = grazerArr[i];
       grazerObj.eat();
       grazerObj.mul();
    }

    for(let i in predatorArr){
        i = parseInt(i);
        let predator = predatorArr[i];
        predator.eat();
        predator.mul();
    }

    for(let i in AlphaMaleArr){
      i = parseInt(i);
      let AlphaMale = AlphaMaleArr[i];
      AlphaMale.eat();
      AlphaMale.mul();
  }

  for(let i in BanelingArr){
   i = parseInt(i);
   let Baneling = BanelingArr[i];
   Baneling.suicide();
}
 
    for(let y=0; y<matrix.length; y++) {
       for(let x = 0; x<matrix[y].length; x++) {
          if(matrix[y][x] == 0) {
             fill('white');
          }else if(matrix[y][x] == 1) {
             fill('green');
          }else if(matrix[y][x] == 2) {
             fill('yellow');
          }else if(matrix[y][x] == 3) {
             fill('red');
          }
         //  }else if(matrix[y][x] == 4) {
         //    fill('purple');
         //  }else if(matrix[y][x] == 5) {
         //    fill('black');
         //  }
           
          rect(x*side, y*side, side, side);

       }
    }
 }