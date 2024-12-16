let hp = 400;
let maxhp = 400;
let stamina = 400;
let maxStamina = 400;
let moveDirect = "right";
// Variable for heart display
let heartx = 80;

class Sprite {
  constructor(sheet, x, y) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
    this.h = sheet.height;
    this.frame = 0;
    this.frames = floor(sheet.width / sheet.height);
    this.isJumping = false;
    this.velocityY = 0;
    this.gravity = 0.5;
    this.jumpStrength = -8;
    this.groundLevel = y;
  }

  act() {
    if (hp <= 0 && heartx < 20) {
      return;
    }
    this.move();
    this.running();
    this.jumping();
    this.interactweapon();
    this.animation();
    this.life();
    this.hpset();
    this.staminaset();
  }

  show() {
    if (moveDirect === "right") {
      image(act, this.x, this.y, this.h, this.h,
        this.h * floor(this.frame), 0, this.h, this.h);
    } else if (moveDirect === "left") {
      push();
      scale(-1, 1); // Flip the sprite for left movement
      image(act, -this.x - this.h, this.y, this.h, this.h,
        this.h * floor(this.frame), 0, this.h, this.h);
      pop();
    }
  }

  animation() {
    // Set the action based on key presses
    if (this.isJumping) {
      act = jump;
    } 
    else if ((keyIsDown(68) || keyIsDown(65)) && !this.isJumping && !keyIsDown(16)) {
      act = walk;  // Walking animation when left or right is pressed
    } 
    else if (keyIsDown(16) && stamina > 0 && (keyIsDown(68) || keyIsDown(65))) {
      act = run;  
    } 
    else if (act !== death) {
      act = idle;  
    }
  }
  animationframe() {
    if (act !== idle) {
      this.frame += 0.1;
      if (this.frame >= floor(this.frames) && act !== death) {
        this.frame = 0;
      }
      if (this.frame >= floor(this.frames) && act === death) {
        isdead = true;
      }
    }
  }

  move() {
    // Move right
    if (this.x < width - 30 && keyIsDown(68)) {
      moveDirect = "right";
      this.x++;
    }

    // Move left
    if (this.x > 0 && keyIsDown(65)) {
      moveDirect = "left";
      this.x--;
    }
  }

  running() {
    if (keyIsDown(16) && keyIsDown(68) && this.x < width - 30) {
      if (stamina > 0) {
        this.x += 1.25;
        stamina -= 0.5; // Decrease stamina while running
      } else {
        this.x++; // If no stamina, normal walking speed
      }
    }

    else if (keyIsDown(16) && keyIsDown(65) && this.x > 0) {
      if (stamina > 0) {
        this.x -= 1.25;
        stamina -= 0.5;
      } else {
        this.x--;
      }
    }
  }

  jumping() {
    if (keyIsDown(32) && !this.isJumping && stamina >= 20) {
      this.isJumping = true;
      this.velocityY = this.jumpStrength;
      stamina -= 20;
    }

    if (this.isJumping) {
      this.y += this.velocityY;
      this.velocityY += this.gravity;
      if (this.y >= this.groundLevel) {
        this.y = this.groundLevel;
        this.isJumping = false;
        this.velocityY = 0;
      }
    }
  }

  life() {
    if (hp === 0) {
      heartx -= 30;
      hp = 400;
    }
    if (heartx < 20) {
      hp = 0;
    }
    for (let x = 20; x <= heartx; x += 30) {
      heart(x, 75, 20);
    }
  }

  staminaset() {
    if (keyIsDown(16) && (keyIsDown(65) || keyIsDown(68))) {
      if (stamina > 0) {
        stamina -= 0.5;
      }
    } else {
      if (stamina < maxStamina && !this.isAttacking) {
        stamina += 0.5;
      }
    }
    stamina = constrain(stamina, 0, maxStamina);
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(10, 10, 200, 20);
    noStroke();
    fill(0, 255, 0);
    rect(10, 10, map(stamina, 0, maxStamina, 0, 200), 20);
  }

  hpset() {
    hp = constrain(hp, 0, maxhp);
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(10, 40, 200, 20);
    noStroke();
    fill(255, 0, 0);
    rect(10, 40, map(hp, 0, maxhp, 0, 200), 20);
  }
  
  interactweapon() {
    //key e
    if (keyIsDown(69) && !isholdWeapon) {
      isholdWeapon = true;
    }
    //key r
    if (keyIsDown(82) && isholdWeapon) {
      isholdWeapon = false;
    }
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


