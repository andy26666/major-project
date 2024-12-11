let currentweapon;

class Inventory {
  constructor(rows, cols) {
    this.items = [];
    this.rows = rows; 
    this.cols = cols;
    this.cellSize = 60; 
  }

  addItem(item) {
    this.items.push(item);
  }

  display() {
    let itemsCount = this.items.length;
    let rows = Math.ceil(itemsCount / this.cols);
    let inventoryWidth = 320;
    let inventoryHeight = 300;

    let borderX = 50;
    let borderY = 80;
    stroke(255);
    strokeWeight(2);
    fill(50, 50, 50, 200);
    rect(borderX - 10, borderY - 10, inventoryWidth, inventoryHeight, 10);

    for (let i = 0; i < itemsCount; i++) {
      let col = i % this.cols;
      let row = Math.floor(i / this.cols);
      let x = borderX + col * this.cellSize;
      let y = borderY + row * this.cellSize;
      this.items[i].display(x, y);
    }
  }

  checkItemClick(mouseX, mouseY) {
    let itemsCount = this.items.length;
    let borderX = 50;
    let borderY = 80;

    for (let i = 0; i < itemsCount; i++) {
      let col = i % this.cols;
      let row = Math.floor(i / this.cols);
      let x = borderX + col * this.cellSize;
      let y = borderY + row * this.cellSize;
            
      // Check if the mouse clicked on this item
      if (mouseX > x && mouseX < x + 30 && mouseY > y && mouseY < y + 30) {
        //change the weapon
        allWeapons = new Weaponofplayer(this.items[i].icon, 100, 200); 
      }
    
    }
  }
}
