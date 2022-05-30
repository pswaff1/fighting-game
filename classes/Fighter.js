// Define Fighter Class
class Fighter {
    constructor({ position, velocity, dimensions, color = "red", offset }) {
      this.position = position;
      this.velocity = velocity;
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
      this.lastKey;
      this.crouched = false;
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        offset,
        width: 100,
        height: 50,
      };
      this.color = color;
      this.attacking = false;
      this.health = 100;
    }
  
    draw() {
      // Draw character
      c.fillStyle = this.color;
      c.fillRect(
        this.position.x,
        this.position.y,
        this.dimensions.width,
        this.dimensions.height
      );
  
      // Draw attackBox
      if (this.attacking) {
        c.fillStyle = "gold";
        c.fillRect(
          this.attackBox.position.x,
          this.attackBox.position.y,
          this.attackBox.width,
          this.attackBox.height
        );
      }
    }
  
    update() {
      this.draw();
  
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
      this.attackBox.position.y = this.position.y;
  
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;
  
      if (
        this.position.y + this.dimensions.height + this.velocity.y >
        canvas.height - 96
      ) {
        this.velocity.y = 0;
      } else {
        this.velocity.y += gravity;
      }
    }
  
    attack() {
      this.attacking = true;
      setTimeout(() => {
        this.attacking = false;
      }, 100);
    }
  }
