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

let isdead = false;
let inventory;
let setting;
let inventorystatus = "closed"; 
let settingstatus = "closed";
let howMuchWeapon = 0;
let isholdWeapon = false;
let isininventory = false;
let newItem;
let inventoryorder = 0;

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
  setting = new Setting(3,5);
  act = idle;
  whatWeapon = metorblade;
  newStuff = lord_of_flame_weapon;
  
  inventory.addItem(new Item('Blood Blade', bloodblade));
  inventory.addItem(new Item('Meteor Blade', metorblade));
  inventory.addItem(new Item('Wizzar Blade', wizzarblade));
  inventory.addItem(new Item('Boss Weapon', bossweapon));
  inventory.addItem(new Item('Lord of Flame Weapon', lord_of_flame_weapon));
  inventory.addItem(new Item('Curve Sword', curvesword));
  
  
  character = new Sprite(act, 100, 200);
  allWeapons = new Weaponofplayer(whatWeapon, 100, 200);
  newWeapons = new Weaponofnew(newStuff, 300, 200);
  
}

function draw() {
  
  if (hp <= 0 && heartx < 20 ) {
    act = death;
    character.animationframe();
  }
  if (!isdead) {
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

    //key p
    if (keyIsDown(80) && settingstatus === "closed") {  
      settingstatus = "opened"; 
    }
    // key o
    if (keyIsDown(79) && settingstatus === "opened") {
      settingstatus = "closed";
    }
  
  
    //display hp,stamina, life only inventory is closed
    if (inventorystatus === "closed" && settingstatus === "closed") {
      background(220);
      allWeapons.display();
      allWeapons.update();
      if (!isininventory) {
        newWeapons.display();
      }
      character.show();
      character.animationframe();
      character.act();

    }
    else if (inventorystatus === "opened" && settingstatus === "closed"){
      background(0);
      inventory.display();
      fill("white");
      textSize(20);
      text('INVENTORY', width/2-55, 50);
    }

    else if (settingstatus === "opened") {
      background(220);
      setting.display();
    }
  }
}

function keyTyped() {
  if (key === 'b' && !isininventory) {
    isininventory = true;
    newItem = new Item('newWeapons', newStuff);
    inventory.addItem(newItem);
  }
}
function mousePressed() {
  allWeapons.attack();
  if (inventorystatus === "opened") {
    inventory.checkItemClick(mouseX, mouseY);
  }
}