class Item {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    }
  
    display(x, y) {
      // Draw the border
      stroke(255);
      strokeWeight(2);
      fill(0);
      rect(x - 5, y - 5, 40, 40, 5);
  
  
      image(this.icon, x, y, 30, 30);
  
      // Display the item name
      //textAlign(CENTER);
      //textSize(10);
      //noStroke();
      //fill(255);
      //text(this.name, x + 15, y + 50);
    }
  }
  
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
      // Calculate the border size
      let itemsCount = this.items.length;
      let rows = Math.ceil(itemsCount / this.cols);
      let inventoryWidth = 320; 
      let inventoryHeight = 300;
  
      // Draw the inventory border
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
  }
  
  