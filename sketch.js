// Major Project
// 2024 11 19
// Kevin Lee
// CS30 

// variable for image of sprite
let walk;
let run;
let idle;
let jump;
let attack1;
let attack2;

//player
let character;
let attackType;
let moveDirect = "right";
let isHit = false;
let stamina = 400; 
let maxStamina = 400;
let hp = 400; 
let maxhp = 400;

// Variable for heart display
let heartx = 80;

function preload() {
  walk = loadImage("Walk.png");
  run = loadImage("Run.png");
  idle = loadImage("Idle.png");
  jump = loadImage("Jump.png");
  attack1 = loadImage("Attack_1.png");
  attack2 = loadImage("Attack_2.png");
}


function setup() {
  createCanvas(400, 400);
  // at start, the sprite is standing
  act = idle; 
  character = new Sprite(act, 0, 250);
}

function draw() {
  background(220);
  character.behaviour();
}

// Character class for movement, jumping, life, stamina, and health
class Sprite {
  constructor(sheet, x, y) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
    this.h = sheet.height;
    this.frame = 0;
    this.frames = sheet.width / sheet.height;

    // Jumping variables
    this.isJumping = false;
    this.velocityY = 0; 
    this.gravity = 0.5; 
    this.jumpStrength = -8; 
    this.groundLevel = y; 

    // Attacking variables
    this.isAttacking = false;
  }

  behaviour() {
    character.show();
    character.move();
    character.running();
    character.jumping();
    character.life();
    character.staminaSet();
    character.hpset();
    character.attacking();
  }

  show() {
    // Update act based on movement, running, and jumping conditions
    if (this.isJumping) {
      act = jump; 
    } 
    // 1 is pressed
    else if (this.isAttacking && attackType === 1) {
      act = attack1;
    }
    // 2 is pressed
    else if (this.isAttacking && attackType === 2) {
      act = attack2;
    }
    // shift pressed and a or d is pressed
    else if (keyIsDown(16) && stamina > 0 && (keyIsDown(68) || keyIsDown(65)) && !this.isAttacking) {
      act = run;
    } 
    // a or d is pressed
    else if (keyIsDown(68) || keyIsDown(65) && !this.isAttacking) {
      act = walk;
    } 
    else {
      act = idle;
      // Automatically increase frames for idle
      this.frame += 0.1;
      if (this.frame > this.frames) {
        this.frame = 0; 
      }
    }

    // Display the correct animation based on movement direction
    if (moveDirect === "right") {
      image(act, this.x, this.y, this.h, this.h,
        this.h * floor(this.frame), 0, this.h, this.h);
    } 
    else if (moveDirect === "left") {
      push();
      // Flip the image horizontally
      scale(-1, 1);
      image(act, -this.x - this.h, this.y, this.h, this.h,
        this.h * floor(this.frame), 0, this.h, this.h);
      pop();
    }
  }

  move() {
    // Move to the right 
    if (this.x < width) {
      if (keyIsDown(68)) {
        moveDirect = "right";
        this.frame += 0.1;
        this.x++;
        if (this.frame > this.frames) {
          this.frame = 0;
        }
      }
    } 
    else {
      moveDirect = "right";
    }

    // Move to the left 
    if (this.x > 0) {
      if (keyIsDown(65)) {
        moveDirect = "left";
        this.frame += 0.1;
        this.x--;
        if (this.frame > this.frames) {
          this.frame = 0;
        }
      }
    } 
    else {
      moveDirect = "left";
    }
  }

  running() {
    // Running to right when shift pressed
    if (keyIsDown(16) && keyIsDown(68)) {
      if (stamina > 0) {
        this.x += 1.25; // run if stamina > 0
      } 
      else {
        this.x++; // didn't run 
      }
    }
    // Running to left when shift pressed
    else if (keyIsDown(16) && keyIsDown(65)) {
      if (stamina > 0) {
        this.x -= 1.25; // run if stamina > 0
      } 
      else {
        this.x--; // didn't run
      }
    }
  }
  jumping() {
    // Start jump when space is pressed, sprite is not already jumping, and stamina is sufficient
    if (keyIsDown(32) && !this.isJumping && stamina >= 20) {
      this.isJumping = true;
      this.velocityY = this.jumpStrength;
      // Decrease stamina for jumping
      stamina -= 20; 
    }

    // Apply gravity and update vertical position
    if (this.isJumping) {
      this.y += this.velocityY;
      this.velocityY += this.gravity;

      // Increase frame for jumping 
      this.frame += 0.1;
      if (this.frame > this.frames) {
        this.frame = 0; 
      }

      // Check if sprite lands on the ground
      if (this.y >= this.groundLevel) {
        this.y = this.groundLevel;
        this.isJumping = false;
        this.velocityY = 0;
      }
    }
  }
  attacking() {
    if (keyIsDown(49) && !this.isAttacking && stamina >= 100) {
      this.isAttacking = true;
      attackType = 1;
      stamina -= 50;
    }

    if (this.isAttacking && attackType === 1) {
      this.frame += 0.1;
      if (this.frame > this.frames + 3) {
        this.frame = 0;
        this.isAttacking = false;
      }
    }

    if (keyIsDown(50) && !this.isAttacking && stamina >= 100) {
      this.isAttacking = true;
      attackType = 2;
      stamina -= 50;
    }
    if (this.isAttacking && attackType === 2) {
      this.frame += 0.1;
      if (this.frame > this.frames - 3) {
        this.frame = 0;
        this.isAttacking = false;
      }
    }
  }



  life() {
    if (hp === 0) {
      heartx -= 30;
      hp = 400;
      isHit = false;
    }
    if (heartx === 20) {
      console.log("dead");
    }
    for (let x = 20; x <= heartx; x += 30) {
      heart(x, 75, 20);
    }
  }
  staminaSet() {
    if (keyIsDown(16) && (keyIsDown(65) || keyIsDown(68))) {
      if (stamina > 0) {
        stamina -= 0.5; // Decrease stamina slowly when running
      }
    }
    else {
      if (stamina < maxStamina) {
        stamina += 0.5; // Increase stamina slowly when not running
      }
    }
    // Ensure stamina doesn't exceed the maximum limit
    stamina = constrain(stamina, 0, maxStamina);
    
    // Draw stamina bar
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(10, 10, 200, 20);
    
    // Draw current stamina
    noStroke();
    fill(0, 255, 0);
    rect(10, 10, map(stamina, 0, maxStamina, 0, 200), 20);
  }

  hpset() {
    // Ensure HP doesn't exceed the maximum limit
    hp = constrain(hp, 0, maxhp);

    // Draw HP bar
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(10, 40, 200, 20);

    // Draw current HP
    noStroke();
    fill(255, 0, 0);
    rect(10, 40, map(hp, 0, maxhp, 0, 200), 20);
  }
}

// Function to draw heart shape 
function heart(x, y, size) {
  fill("red");
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}