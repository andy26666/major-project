class Weaponofplayer {
  constructor(sheet, x, y) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
    this.isAttacking = false;
    this.attackSpeed = 0.1; // Speed of weapon rotation
    this.attackAngle = -PI / 8; // Initial attack angle (upward)
    this.maxAttackAngle = 0; // Maximum attack angle (horizontal)
  }

  // Trigger the attack animation
  attack() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.attackAngle = -PI / 8;
    }
  }

  // Update the weapon's angle during the attack
  update() {
    if (this.isAttacking) {
      angleMode(RADIANS);
      if (moveDirect === "right") {
        this.maxAttackAngle = PI / 4; // Slightly downward
        this.attackAngle += this.attackSpeed;
        if (this.attackAngle >= this.maxAttackAngle) {
          this.isAttacking = false; // Stop attack when max angle is reached
          this.attackAngle = -PI / 8; // Reset angle for the next attack
        }
      } else if (moveDirect === "left") {
        this.maxAttackAngle = 0; // Slightly downward for left direction
        this.attackAngle -= this.attackSpeed;
        if (this.attackAngle <= this.maxAttackAngle) {
          this.isAttacking = false;
          this.attackAngle = PI / 4;
        }
      }
    }
  }

  // Display the weapon
  display() {
    push();
    translate(this.x, this.y); // Position the weapon
    if (moveDirect === "right" && isholdWeapon) {
      rotate(this.attackAngle);
      image(this.sheet, 0, 0, 25, 25);
    } else if (moveDirect === "left" && isholdWeapon) {
      scale(-1, 1); // Flip horizontally
      rotate(-this.attackAngle);
      image(this.sheet, 0, 0, 25, 25);
    }
    pop();
  }
}

class Weaponability extends Weaponofplayer {
  constructor(sheet, x, y, name) {
    super(sheet, x, y);
    this.name = name;
  }

  ability() {
    if (this.name === "metorblade") {
      // Add unique abilities for the weapon here
    }
  }
}