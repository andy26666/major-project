class Weaponofnew {
    constructor(sheet, x, y) {
      this.sheet = sheet; 
      this.x = x; 
      this.y = y; 
    }
  display() {
    image(this.sheet, this.x, this.y, 25, 25);
  }

}