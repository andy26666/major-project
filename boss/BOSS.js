class Boss {
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
      this.speed = 2;  
    }
    
    display() {
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
      // Check if the mouse is outside the defined range of the boss
      if (this.x - 10 > mouseX || this.x + 60 < mouseX) {
        act = bosswalk;  
        if (mouseX < this.x) {
          moveDirect = "left";
          this.x -= this.speed;  
        } 
        else if (mouseX > this.x) {
          moveDirect = "right";
          this.x += this.speed;  
        }
      } else {
        act = bossattack;  // Switch to idle animation if within range
      }
    }
  
    animationframe() {
      if (act !== bossidle) {
        this.frame += 0.1;
        if (this.frame >= floor(this.frames) && act !== bossdeath) {
          this.frame = 0;
        }
        if (this.frame >= floor(this.frames) && act === bossdeath) {
          isdead = true;
        }
      }
    }
  }
  