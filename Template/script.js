/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

const star = Util.thing; 

Util.setPosition(0.22,0.12,star); 

function createMaze(){
 
 const standartSize = Math.min(window.innerWidth, window.innerHeight);
 const mazeScale = 1.75;
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

 let minX = Math.min(...walls.map(w=>w.x));
 let maxX = Math.max(...walls.map(w=>w.x));
 let minY = Math.min(...walls.map(w=>w.y));
 let maxY = Math.max(...walls.map(w=>w.y));

 const mazeWidth = (maxX-minX)*standartSize*mazeScale;
 const mazeHeight = (maxY-minY)*standartSize*mazeScale;
 const shiftX = window.innerWidth/2-mazeWidth/2-minX*standartSize*mazeScale;
 const shiftY = window.innerHeight/2-mazeWidth/2-minY*standartSize*mazeScale;

 for(const wall of walls){
  const w = Util.createThing();
  
  Util.setSize(wall.w * standartSize*mazeScale, wall.h * standartSize*mazeScale, w);
  Util.setPositionPixels(wall.x * standartSize*mazeScale+shiftX, wall.y * standartSize*mazeScale+shiftY, w);
  Util.setRoundedness(0,w);
  Util.setColour(255,255,255,1,w);

  labyrinthWalls.push(w);

 };
 return labyrinthWalls;
};

function createFinish() {
  const finish = Util.createThing();
  const finishSize = 0.08;
  const standartSize = Math.min(window.innerWidth,window.innerHeight);

  Util.setSize(finishSize*standartSize,finishSize*standartSize,finish);
  Util.setRoundedness(0.3,finish)
  Util.setPosition(window.innerWidth/2, window.innerHeight/2,finish);
  Util.setColour(255,255,2,1,finish);
  Util.setPosition(0.447,0.43,finish);
  return finish;
};


// Code that runs over and over again
function loop() {
 window.requestAnimationFrame(loop);

};

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
 createFinish();
 createMaze();

  
  window.requestAnimationFrame(loop);
 
 // Put your event listener code here

  window.requestAnimationFrame(loop);
};

setup(); // Always remember to call setup()!
