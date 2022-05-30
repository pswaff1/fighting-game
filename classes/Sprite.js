// Define Sprite Class
class Sprite {
    constructor({ position, dimensions}) {
      this.position = position;
      this.dimensions = dimensions;
      this.keys = {
        a: {
          pressed: false,
        },
        s: {
          pressed: false,
        },
        d: {
          pressed: false,
        },
        w: {
          pressed: false,
        },
      };
    }
  
    draw() {
    }
  
    update() {
      this.draw()
    }
  }  