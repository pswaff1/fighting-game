// Define Sprite Class
class Sprite {
    constructor({ position, dimensions, imageSrc }) {
      this.position = position;
      this.dimensions = dimensions;
      this.image = new Image()
      this.image.src = imageSrc
    }
  
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
  
    update() {
      this.draw()
    }
  }  