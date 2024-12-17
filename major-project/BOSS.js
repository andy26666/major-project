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
      if (bossmoveDirect === "right") {
        image(bossact, this.x, this.y, this.h, this.h,
          this.h * floor(this.frame), 0, this.h, this.h);
      } else if (bossmoveDirect === "left") {
        push();
        scale(-1, 1); // Flip the sprite for left movement
        image(bossact, -this.x - this.h, this.y, this.h, this.h,
          this.h * floor(this.frame), 0, this.h, this.h);
        pop();
      }
    }
  
    animation() {
      // Check if the mouse is outside the defined range of the boss
      if (this.x - 30 > playersX || this.x + 60 < playersX) {
        bossact = bosswalk;  
        if (playersX < this.x) {
          bossmoveDirect = "left";
          this.x -= this.speed; 
          bossX = this.x;
        } 
        else if (playersX > this.x) {
          bossmoveDirect = "right";
          this.x += this.speed;  
          bossX = this.x;
        }
      } else {
        bossact = bossidle;
      }
    }
  
    animationframe() {
      if (act !== bossidle) {
        this.frame += 0.1;
        if (this.frame >= floor(this.frames) && bossact !== bossdeath) {
          this.frame = 0;
        }
        if (this.frame >= floor(this.frames) && bossact === bossdeath) {
          isdead = true;
        }
      }
    }

    attack() {
      let attPercent = random(100);

      if (attPercent < 50) {
        console.log("normal attack");
      }
      else if (attPercent < 75) {
        console.log("Ability");
      }
      else {
        console.log("Ultimate");
      }
    }
  }
  