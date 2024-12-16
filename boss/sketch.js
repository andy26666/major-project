// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let bosswalk;
let bossattack;
let bossdeath;
let bossidle;
let moveDirect = "left";
let isdead = false;
let boss;

let bossX = 300;
let bossY = 200;

let swords2020;
let swords2021;
let swords2022;
let swords2023;
let swords2024;
let swordsarr = [];

function preload() {
  bosswalk = loadImage("/boss/allimage/bosswalk.png");
  bossattack = loadImage("boss//allimage/bossattack.png");
  bossdeath = loadImage("/boss/allimage/bossdeath.png");
  bossidle = loadImage("/boss/allimage/bossidle.png");
  bossjump = loadImage("/boss/allimage/bossjump.png");
  
  swords2020 = loadImage("/boss/allimage/2020weapon.png");
  swords2021 = loadImage("/boss/allimage/2021weapon.png");
  swords2022 = loadImage("/boss/allimage/2022weapon.png");
  swords2023 = loadImage("/boss/allimage/2023weapon.png");
  swords2024 = loadImage("/boss/allimage/2024weapon.png");
}



function setup() {
  createCanvas(600, 600);
  act = bossidle;
  
  let swordWidth = swords2024.width / 6; // 10 
  let swordHeight = swords2024.height / 5; // 3 
  
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 6; col++) {
      let x = col * swordWidth;
      let y = row * swordHeight;
      let sword = swords2024.get(x, y, swordWidth, swordHeight); 
      swordsarr.push(sword);
    }
  }
  
  boss = new Boss(act, bossX,bossY);
  
  
}

function draw() {
  background(220);
  boss.display();
  boss.animation();
  boss.animationframe();
  image(swordsarr[11], 300, 200, 25, 20);
}