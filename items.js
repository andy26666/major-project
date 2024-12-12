class Item {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
    }
  display(x, y) {
    // Draw the border
    if (this.icon === whatWeapon ) {
      stroke('red');
    }
    else {
      stroke(255);
    }
    strokeWeight(2);
    fill(0);
    rect(x - 5, y - 5, 40, 40, 5);
    image(this.icon, x, y, 30, 30);
    }

  update() {
    if (this.icon === whatWeapon ) {
      stroke('red');
    }
    else {
      stroke(255);
    }
  }
}

class Settingbutton{
  constructor(label){
    this.label = label;
  }
}