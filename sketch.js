// player image
//all weapons in game
const TOTAL_AMOUNT_OF_WEAPON = 6;

let walk;
let run;
let jump;
let death;
let idle;

let act;
let character;
let allWeapons;
let whatWeapon;
let newWeapons;
let newStuff;

let inventory;
let inventorystatus = "closed"; 
let howMuchWeapon = 0;
let isholdWeapon = false;
let isnewItem = false;;
let newItem;

function preload() {
  idle = loadImage("/player/idle.png");
  walk = loadImage("/player/walk.png");
  run = loadImage("/player/run.png");
  jump = loadImage("/player/jump.png");
  death = loadImage("/player/death.png");

  bloodblade = loadImage("/weapon/bloodblade.png");
  metorblade = loadImage("/weapon/metorblade.png");
  wizzarblade = loadImage("/weapon/wizzar.png");
  bossweapon = loadImage("/weaponofBoss/firstweapon.png");
  lord_of_flame_weapon = loadImage("/weaponofBoss/flamelord.png");
  curvesword = loadImage("/weapon/curvesword.png");
}

function setup() {
  createCanvas(400, 400);
  inventory = new Inventory(3,5);
  act = idle;
  whatWeapon = metorblade;
  newStuff = lord_of_flame_weapon;
  
  newItem = new Item('whatWeapon', whatWeapon);
  inventory.addItem(newItem);
  
  character = new Sprite(act, 100, 200);
  allWeapons = new Weaponofplayer(whatWeapon, 100, 200);
  newWeapons = new Weaponofnew(newStuff, 300, 200);
}

function draw() {
  // Position the weapon based on direction
  if (isholdWeapon && moveDirect === "right"){
    allWeapons.x = character.x + 20; 
    allWeapons.y = character.y; 
  }
  // If the character is facing left
  else if (isholdWeapon && moveDirect === "left") {
    allWeapons.x = character.x + 12;
    allWeapons.y = character.y;
  } 
  else {
    allWeapons.x = allWeapons.x;
    allWeapons.y = allWeapons.y;
  }

  // inventory display on Esc key, hide on U key
  if (keyIsDown(27) && inventorystatus === "closed") {  
    inventorystatus = "opened"; 
  }
  if (keyIsDown(85) && inventorystatus === "opened") {
    inventorystatus = "closed";
    }
  
  
  //display hp,stamina, life only inventory is closed
  if (inventorystatus === "closed") {
    background(220);
    character.animation();
    character.act();
    allWeapons.display();
    allWeapons.update();
    character.life();
    character.staminaSet();
    character.hpset();
    newWeapons.display();
  }
  else {
    background(0);
    inventory.display();
    fill("white");
    textSize(20);
    text('INVENTORY', width/2-55, 50);
  }

  //check if player get new weapon
  if (isnewItem) {
    newItem = new Item('newWeapons', newStuff);
    inventory.addItem(newItem);
    isnewItem = false;
  }
}

function mouseClicked(){
  allWeapons.attack();
}