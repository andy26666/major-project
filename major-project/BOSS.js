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

    direct() {
      if (this.x > bossX) {
        bossmoveDirect = "right";
        bossX = this.x;
      }
      else if (this.x < bossX) {
        bossmoveDirect = "left";
        bossX = this.x;
      }
      else {
        bossmoveDirect = bossmoveDirect;
        bossX = this.x;
      }
    }
  
    animation() {
      // Check if the mouse is outside the defined range of the boss
      if (this.x - 35 > playersX || this.x + 65 < playersX) {
        bossact = bosswalk;  
        if (playersX < this.x) {
          this.x -= this.speed; 

        } 
        else if (playersX > this.x) {
          this.x += this.speed;  
        }
      } else {
        bossact = bossidle;
      }
    }
  
    animationframe() {
      if (bossact !== bossidle) {
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
  
function bossattacking() {
  if (bossmoveDirect === "right"){
    bosswep.x = boss.x + 57; 
    bosswep.y = 218; 
  }
  // If the character is facing left
  else if (bossmoveDirect === "left") {
    bosswep.x = boss.x + 7;
    bosswep.y = 218;
  } 
  else {
    bosswep.x = boss.x;
    bosswep.y = 218;
  }
}