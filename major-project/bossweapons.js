let bossweapon;
let lord_of_flame_weapon;

class Weaponofboss {
    constructor(sheet, x, y) {
      this.sheet = sheet; 
      this.x = x; 
      this.y = y; 
      this.attackOffset = 0; 
      this.isAttacking = false; 
      this.attackSpeed = 5; 
      this.maxAttackOffset = 20; 
      this.attackAngle = 0; 
      this.maxAttackAngle = PI / 4; 
    }
    attack() {
      if (!this.isAttacking) {
        this.isAttacking = true;
        this.attackOffset = 0;
        this.attackAngle = 0; 
      } 
    }
    update() {
      if (this.isAttacking) {
        this.attackOffset += this.attackSpeed;
  
       
        if (bossmoveDirect === "right") {
          this.attackAngle = (this.attackOffset / this.maxAttackOffset) * this.maxAttackAngle;
        } else if (bossmoveDirect === "left") {
          this.attackAngle = -(this.attackOffset / this.maxAttackOffset) * this.maxAttackAngle;
        }
  
        if (this.attackOffset >= this.maxAttackOffset) {
          this.isAttacking = false; 
          this.attackOffset = 0; 
          this.attackAngle = 0; 
        }
      }
    }
  
  
    // Display the weapon
    display() {
      push();
      translate(this.x, this.y); 
      let offsetY = this.isAttacking ? this.attackOffset : 0;
      let angle = this.isAttacking ? this.attackAngle : 0;
  
      if (bossmoveDirect === "right") {
        rotate(angle);
        image(this.sheet, 0, offsetY, 25, 25);
      } 
      else if (bossmoveDirect === "left") {
        scale(-1, 1); // Flip horizontally
        rotate(-angle); 
        image(this.sheet, 0, offsetY, 25, 25); 
      }
      pop();
    }
  }
  