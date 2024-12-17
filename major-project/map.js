
class Map{
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.extendx = this.x * 4;
      this.extendy = this.y * 4;
    }
    mapboard() {
      noFill();
      strokeWeight(4);
      stroke(51);
      if(!isextend) {
        square(300,300,100);
      }
      else {
        square(0,0,width);
      }
    }
    
    move() {
      if (!isextend) {
        if (keyIsDown(65)) {
          this.x--;
        }
      if (keyIsDown(68)) {
          this.x++;
        }
      }
    }
    
    display() {
      fill("white");
      strokeWeight(1);
      stroke(51);
      if (!isextend) {
        ellipse(this.x,this.y,7,7);
      }
      else {
        ellipse(this.x-150,this.y-150,28,28);
      }
    }
    
  }