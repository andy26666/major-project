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
      let inventoryWidth = 300;
      let inventoryHeight = 300;
  
      let borderX = 60;
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
      let borderX = 60;
      let borderY = 80;
  
      for (let i = 0; i < itemsCount; i++) {
        let col = i % this.cols;
        let row = Math.floor(i / this.cols);
        let x = borderX + col * this.cellSize;
        let y = borderY + row * this.cellSize;
  
        if (mouseX > x && mouseX < x + 30 && mouseY > y && mouseY < y + 30) {
          allWeapons = new Weaponofplayer(this.items[i].icon, 100, 200); 
          console.log(this.items[i].name);
        }
      }
    }
  }
  
  class Setting {
    constructor(rows, cols) {
      this.rows = rows;
      this.cols = cols;
      this.settingbutton = [];
      this.cellSize = 60; 
    }
  
    addSetting(setting) {
      this.settingbutton.push(setting);
    }
  
    display() {
      let settingsCount = this.settingbutton.length;
      let borderX = 60;
      let borderY = 80;
      let gridWidth = 300;
      let gridHeight = 200;
  
      // Draw the background with border for settings
      stroke(255);
      strokeWeight(2);
      fill(50, 50, 50, 200);
      rect(borderX - 10, borderY - 10, gridWidth, gridHeight, 10);
  
      for (let i = 0; i < settingsCount; i++) {
        let col = i % this.cols;
        let row = Math.floor(i / this.cols);
        let x = borderX + col * this.cellSize;
        let y = borderY + row * this.cellSize;
  
  
        fill(200);
        rect(x, y, this.cellSize, this.cellSize, 5);
  
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(12);
        text(this.settingbutton[i].label, x + this.cellSize / 2, y + this.cellSize / 2); 
      }
    }
  
    checkSettingClick(mouseX, mouseY) {
      let settingsCount = this.settingbutton.length;
      let borderX = 60;
      let borderY = 80;
  
      for (let i = 0; i < settingsCount; i++) {
        let col = i % this.cols;
        let row = Math.floor(i / this.cols);
        let x = borderX + col * this.cellSize;
        let y = borderY + row * this.cellSize;
  
        if (mouseX > x && mouseX < x + this.cellSize && mouseY > y && mouseY < y + this.cellSize) {
          console.log(this.settingbutton[i].label);
        }
      }
    }
  }
  