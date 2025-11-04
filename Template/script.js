/*
 * IDB Programming: Code Playground
 *
 */

//Assignment A3 : Functional Prototype
//This assignment is written by:
//Vasilisa Petrushchak

//Use the keys to move the star across the screen to get to the black hole
//from keys T to Q movement left
//from Y to P to the right
//from G to A up
//from B to Z down
//after you reach the black hole, swipe to the right on the numbers row from
//1 to 9 for the star to get into the hole (shrink)
//the game is completed


import * as Util from "./util.js";

//Change the name of the Util file into "star", deparating it in another
//class, so it can have its own properties in css for styling. 
//Giving the star ability to shine, glow
const star = Util.thing; 
star.classList.add("star"); 
star.style.zIndex="3"; // layer of an object
//stores the position of the star, curr and init
let starX = 0;
let starY = 0;
let starXInitial = 0;
let starYInitial = 0; 

//declaring it here, so it can be used further in the code
let finish;



//function that checks wether the star overlaps any wall
function checkStarPos(){
  const starHalf = star.offsetWidth/2;
  //width of the star in px

  for (const wall of wallPos) {
    //goes through every wall in the array
    if(
      //checks wether the star touches any wall
      //left side of the star < right star of the wall, etc
      starX - starHalf < wall.x+ wall.width && //and
      starX + starHalf > wall.x &&
      starY - starHalf < wall.y + wall.height &&
      starY + starHalf > wall.y
    ) {
      //if all true => resets stars position to the start of the game
      starX = starXInitial;
      starY = starYInitial;
      Util.setPositionPixels(starX, starY, star);
      
    }
  }
};

//functions for the star movement across the screen
//moves the star by px
function moveLeft(nSteps){
  for (let i = 0; i < nSteps; i++){
    starX -= 1; //moves 1px at a time
    checkStarPos(); //checks for wall position after each step
    Util.setPositionPixels(starX, starY, star);
  };
};

function moveRight(nSteps){
 for (let i = 0; i < nSteps; i++){
    starX += 1;
    checkStarPos();
    Util.setPositionPixels(starX, starY, star);
  };
};

function moveUp(nSteps){
  for (let i = 0; i < nSteps; i++) {
  starY -= 1;
  checkStarPos();
  Util.setPositionPixels(starX, starY, star);
  };
};

function moveDown(nSteps){
   for (let i = 0; i < nSteps; i++) {
  starY += 1;
  checkStarPos();
  Util.setPositionPixels(starX, starY, star);
  };
};

//array that stores position of the maze walls
let wallPos = [];

//function to create a labyrinth, placing separate walls parameters in the array manualy
//putting all the walls created in another array of a labyrinth
function createMaze(){
 //calculates a base scale of the maze, depending on the screen size
 //maze fits within the smallest values of width and height of the screen
 const standartSize = Math.min(window.innerWidth, window.innerHeight);
 //the amount of space the maze takes on the screen.
 const mazeScale = 1.75; 
 //array stores values of each wall, position and size
 const walls = [
  {x:0.25,y:0.48,w:0.51,h:0.01,rotation:0},
  { x: 0.75, y: 0.48, w: 0.01, h: 0.472, rotation: 90 },
  { x: 0.26, y: 0.95, w: 0.5, h: 0.01, rotation: 180 },
  { x: 0.26, y: 0.56, w: 0.01, h: 0.4, rotation: 270 },
  { x: 0.26, y: 0.55, w: 0.41, h: 0.01, rotation: 0 },
  { x: 0.66, y: 0.551, w: 0.01, h: 0.34, rotation: 90 },
  { x: 0.34, y: 0.891, w: 0.33, h: 0.01, rotation: 180 },
  { x: 0.34, y: 0.60, w: 0.01, h: 0.3, rotation: 270 },
  { x: 0.345, y: 0.60, w: 0.24, h: 0.01, rotation: 0 },
  { x: 0.58, y: 0.60, w: 0.01, h: 0.24, rotation: 90 },
  { x: 0.43, y: 0.83, w: 0.15, h: 0.01, rotation: 180 },
  { x: 0.42, y: 0.67, w: 0.01, h: 0.17, rotation: 270 },
  { x: 0.42, y: 0.67, w: 0.09, h:0.01, rotation: 0 },
  { x: 0.5, y: 0.67, w: 0.01, h: 0.1, rotation: 90},

 ];

 const labyrinthWalls = [];

 //creates an array of all x values from the array walls
 //finds the min value of x values from the array
 let minX = Math.min(...walls.map(w=>w.x));
 let maxX = Math.max(...walls.map(w=>w.x));
 let minY = Math.min(...walls.map(w=>w.y));
 let maxY = Math.max(...walls.map(w=>w.y));

 //normalized values into px
 const mazeWidth = (maxX-minX)*standartSize*mazeScale;
 const mazeHeight = (maxY-minY)*standartSize*mazeScale;
 //center the maze ob the screen
 const shiftX = window.innerWidth/2-mazeWidth/2-minX*standartSize*mazeScale;
 const shiftY = window.innerHeight/2-mazeWidth/2-minY*standartSize*mazeScale;

 //creates a wall element for each wall
 for(const wall of walls){
  const w = Util.createThing();
  w.style.zIndex="1";
  //calculates px position of the wall
  Util.setSize(wall.w * standartSize*mazeScale, wall.h * standartSize*mazeScale, w);
  const wallX = wall.x * standartSize*mazeScale+shiftX;
  const wallY = wall.y * standartSize*mazeScale+shiftY;
  Util.setPositionPixels(wallX, wallY, w);
  Util.setRoundedness(0,w);
  Util.setColour(255,255,255,1,w);
  
  //adds the position to an array
  wallPos.push({
    x: wallX,
    y: wallY,
    width: wall.w*standartSize*mazeScale,
    height: wall.h*standartSize*mazeScale,
  });

  labyrinthWalls.push(w);

 };
 return {labyrinthWalls, standartSize, mazeScale, shiftX, shiftY};
};


//fuunction to create the finish point of the game
function createFinish() {
  //creates an element and stores its values in the variable outside of the function
  finish = Util.createThing();
  finish.classList.add("finish");
  const finishSize = 0.08;
  finish.style.zIndex="2";
  const standartSize = Math.min(window.innerWidth, window.innerHeight);

  Util.setSize(finishSize*standartSize, finishSize*standartSize,finish);
  Util.setRoundedness(0.3,finish);
  Util.setPosition(window.innerWidth/2, window.innerHeight/2,finish);
  Util.setColour(255,255,2,1,finish);
  Util.setPosition(0.447,0.43,finish);
  return finish;
};


function pressTheKey(event){
  const key = event.key.toLowerCase();

  if (key==="t") moveLeft(10);
  else if (key==="r") moveLeft(25);
  else if (key==="e") moveLeft(50);
  else if (key==="w") moveLeft(75);
  else if (key==="q") moveLeft(100);

  else if (key==="y") moveRight(10);
  else if (key==="u") moveRight(25);
  else if (key==="i") moveRight(50);
  else if (key==="o") moveRight(75);
  else if (key==="p") moveRight(100);

  else if (key==="g") moveUp(10);
  else if (key==="f") moveUp(25);
  else if (key==="d") moveUp(50);
  else if (key==="s") moveUp(75);
  else if (key==="a") moveUp(100);

  else if (key==="b") moveDown(10);
  else if (key==="v") moveDown(25);
  else if (key==="c") moveDown(50);
  else if (key==="x") moveDown(75);
  else if (key==="z") moveDown(100);

};
 
function isInBlackHole(){
  //detects the top,left,right,bot,w,h positions of the star and finish on screen
  const starRect = star.getBoundingClientRect(); 
  const finishRect = finish.getBoundingClientRect();

  //check if the star is overlapping the fininsh
  return !( 
    starRect.right < finishRect.left || //r of the star is to the l of the finish
    starRect.left > finishRect.right || //OR operator. l of the star is to the r
    starRect.bottom < finishRect.top || // b of the star is above
    starRect.top > finishRect.bottom    // b of the star is bellow
  );
};

//function for the star to change the size
function shrinkStar() {
  let size = star.offsetWidth; //curr width of the star
  //repetedly runs the code
  const shrink = setInterval(() => {
    if (size > 0.01) {
      size -= 2; //reduce by 2px
      if (size<0.01) size = 0.01; //prevent from disapearing completely
      Util.setSize(size, size, star);
    } else {
      clearInterval(shrink); //stops shrinking

    }
  }, 30); //30 times per sec
};

//Second keyboard interaction
let prevKey = null; //value to remember prev key pressed
let currKey = null;
// an array of keys
const numberRow = [ 
  "Digit1", "Digit2", "Digit3", "Digit4", 
  "Digit5", "Digit6", "Digit7", "Digit8", 
  "Digit9",];

  function swipe(){
    //takes prevkey value from the array and returns its index
    const prevIndex = numberRow.indexOf(prevKey);
    const currIndex = numberRow.indexOf(currKey);
    //checks if the key pressed is in the number row
    if (currIndex < 0 || prevIndex < 0) return 0; //not in the row, does not work
    if (currIndex > prevIndex) return 1; //swipe detected
    return 0;
  };

// Code that runs over and over again
function loop() {
 window.requestAnimationFrame(loop);

};

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  const mazeData = createMaze(); //stores the info from the function
  createFinish();


 

 //event Listener for movement around the maze using three rows of the keyboard
 const starPos = {x: 0.2, y: 0.51};
 starX = starPos.x*mazeData.standartSize*mazeData.mazeScale+mazeData.shiftX;
 starY = starPos.y*mazeData.standartSize*mazeData.mazeScale+mazeData.shiftY;
 starXInitial = starX;
 starYInitial = starY;
 Util.setPositionPixels(starX, starY, star);


 window.addEventListener("keydown", pressTheKey);

 document.addEventListener("keydown", (event) => {
  //prevkey becomes curr
  prevKey = currKey;
  currKey = event.code; //which physical key was pressed

  if (isInBlackHole()) {
        // Check swipe direction
        if (swipe() === 1) { //if keys are pressed to the right direction
            shrinkStar(); // shrink star if swipe is forward inside finish
        }
    }
 });
  window.requestAnimationFrame(loop);


  window.requestAnimationFrame(loop);
};

setup(); // Always remember to call setup()!
