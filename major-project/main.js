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
let playersX = 100;
let playersY = 215;

let showCurrentwep = 'red';
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
let bosswep;
let bossheld;

//for boss

let bosswalk;
let bossdeath;
let bossidle;
let bossjump;
let bossmoveDirect = "left";
let bossdead = false;
let boss;
let bossact;

let bossX = 300;
let bossY = 200;

let weaponV;
let weaponsX = 100;
let weaponsY = 200;

let finalbossidle;

let swords2020;
let swords2021;
let swords2022;
let swords2023;
let swords2024;
let swordsarr = [];

function preload() {

  bosswalk = loadImage("/major-project/allimage/bosswalk.png");
  bossdeath = loadImage("/major-project/allimage/bossdeath.png");
  bossidle = loadImage("/major-project/allimage/bossidle.png");
  bossjump = loadImage("/major-project/allimage/bossjump.png");
  
  swords2020 = loadImage("/major-project/allimage/2020weapon.png");
  swords2021 = loadImage("/major-project/allimage/2021weapon.png");
  swords2022 = loadImage("/major-project/allimage/2022weapon.png");
  swords2023 = loadImage("/major-project/allimage/2023weapon.png");
  swords2024 = loadImage("/major-project/allimage/2024weapon.png");

  finalbossidle = loadImage("/major-project/allimage/Agis.png");

  idle = loadImage("/major-project/player/idle.png");
  walk = loadImage("/major-project/player/walk.png");
  run = loadImage("/major-project/player/run.png");
  jump = loadImage("/major-project/player/jump.png");
  death = loadImage("/major-project/player/death.png");

  bloodblade = loadImage("/major-project/weapon/bloodblade.png");
  metorblade = loadImage("/major-project/weapon/metorblade.png");
  wizzarblade = loadImage("/major-project/weapon/wizzar.png");
  bossweapon = loadImage("/major-project/weaponofBoss/firstweapon.png");
  lord_of_flame_weapon = loadImage("/major-project/weaponofBoss/flamelord.png");
  curvesword = loadImage("/major-project/weapon/curvesword.png");
}

function setup() {
  createCanvas(400, 400);
  inventory = new Inventory(3,5);
  setting = new Setting(3,3);

  weaponV = createVector(weaponsX, weaponsY);
  act = idle;
  whatWeapon = metorblade;
  newStuff = lord_of_flame_weapon;
  bossact = bossidle;

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
  bossheld = swordsarr[28];
  
  inventory.addItem(new Item('Blood Blade', bloodblade));
  inventory.addItem(new Item('Meteor Blade', metorblade));
  inventory.addItem(new Item('Wizzar Blade', wizzarblade));
  inventory.addItem(new Item('Boss Weapon', bossweapon));
  inventory.addItem(new Item('Lord of Flame Weapon', lord_of_flame_weapon));
  inventory.addItem(new Item('Curve Sword', curvesword));
  
  setting.addSetting(new Settingbutton('Sound'));
  setting.addSetting(new Settingbutton('Graphics'));
  setting.addSetting(new Settingbutton('Controls'));
  setting.addSetting(new Settingbutton('Language'));
  setting.addSetting(new Settingbutton('Brightness'));

  
  character = new Sprite(act, playersX, playersY);
  allWeapons = new Weaponofplayer(whatWeapon, weaponsX, weaponsY);
  newWeapons = new Weaponofnew(newStuff, 300, 200);
  boss = new Boss(bossact, bossX,bossY);
  bosswep = new Weaponofboss(bossheld, 300, 220);
  
}

function draw() { 


  
  if (hp <= 0 && heartx < 20 ) {
    act = death;
    character.animationframe();
  }
  if (!isdead) {
    //place of player weapon when player held weapon
     playerattacking();
    //place of boss weapon when boss held weapon
     bossattacking();

    // inventory display on Esc key, hide on U key
    if (keyIsDown(27) && inventorystatus === "closed" && settingstatus === "closed") {  
      inventorystatus = "opened"; 
    }
    if (keyIsDown(85) && inventorystatus === "opened") {
      inventorystatus = "closed";
    }

    //key p
    if (keyIsDown(80) && settingstatus === "closed" && inventorystatus === "closed") {  
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
      boss.display();
      boss.direct();
      boss.animation();
      boss.animationframe();
      bosswep.update();
      bosswep.display();
      //boss.attack();

    }
    else if (inventorystatus === "opened" && settingstatus === "closed"){
      background(0);
      inventory.display();
      fill("white");
      textSize(20);
      text('INVENTORY', width/2-60, 50);
    }

    else if (settingstatus === "opened") {
      background(220);
      setting.display();
      fill("black");
      textSize(20);
      text('SETTING', width/2, 50);
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
  if (settingstatus === "opened") {
    setting.checkSettingClick(mouseX, mouseY);
  }
}