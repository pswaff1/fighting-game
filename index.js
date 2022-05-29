// import Sprite from "/Sprite.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;

// Define Sprite Class
class Sprite {
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
    this.health = 100
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
      canvas.height
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

// Create charactor Sprite
const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  dimensions: {
    height: 150,
    width: 50,
  },
  color: "green",
  offset: {
    x: 0,
    y: 0,
  },
});

// Create enemey Sprite
const enemy = new Sprite({
  position: {
    x: 974,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  dimensions: {
    height: 150,
    width: 50,
  },
  color: "red",
  offset: {
    x: -50,
    y: 0,
  },
});

// Check for collision between two rectangles
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <
      rectangle2.position.x + rectangle2.dimensions.width &&
    rectangle1.attackBox.position.y <
      rectangle2.position.y + rectangle2.dimensions.height &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >
      rectangle2.position.y
  );
}

// Animating canvas
function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "red";
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // Move player horizontally
  if (player.keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  } else if (player.keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  }

  // Move enemy horizontally
  if (enemy.keys.d.pressed && enemy.lastKey === "d") {
    enemy.velocity.x = 5;
  } else if (enemy.keys.a.pressed && enemy.lastKey === "a") {
    enemy.velocity.x = -5;
  }

  // Detect player hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.attacking
  ) {
    player.attacking = false;
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
  }

  // Detect enemy hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.attacking
  ) {
    enemy.attacking = false;
    player.health -= 20
    document.querySelector('#playerHealth').style.width = player.health + '%'
  }
}
animate();

// Listen for key presses
window.addEventListener("keydown", (event) => {
  // console.log(event.key)

  // Player key presses
  if (event.key == "d") {
    player.keys.d.pressed = true;
    player.lastKey = "d";
  } else if (event.key == "a") {
    player.keys.a.pressed = true;
    player.lastKey = "a";
  } else if (event.key == "s" && player.crouched === false) {
    player.dimensions.height /= 2;
    player.position.y += player.dimensions.height;
    player.crouched = true;
  } else if (
    event.key == "w" &&
    player.position.y + player.dimensions.height >= canvas.height
  ) {
    player.velocity.y = -15;
  } else if (event.key == " ") {
    player.attack();
  }

  // Enemy key presses
  if (event.key == "ArrowRight") {
    enemy.keys.d.pressed = true;
    enemy.lastKey = "d";
  } else if (event.key == "ArrowLeft") {
    enemy.keys.a.pressed = true;
    enemy.lastKey = "a";
  } else if (event.key == "ArrowDown" && enemy.crouched === false) {
    enemy.dimensions.height /= 2;
    enemy.position.y += enemy.dimensions.height;
    enemy.crouched = true;
  } else if (
    event.key == "ArrowUp" &&
    enemy.position.y + enemy.dimensions.height >= canvas.height
  ) {
    enemy.velocity.y = -15;
  } else if (event.key == "0") {
    enemy.attack();
  }
});

// Listen for key releases
window.addEventListener("keyup", (event) => {
  // Player keyups
  if (event.key == "d") {
    player.keys.d.pressed = false;
  } else if (event.key == "a") {
    player.keys.a.pressed = false;
  } else if (event.key == "s" && player.crouched == true) {
    player.position.y -= player.dimensions.height;
    player.dimensions.height *= 2;
    player.crouched = false;
  }

  // Enemy keyups
  if (event.key == "ArrowRight") {
    enemy.keys.d.pressed = false;
  } else if (event.key == "ArrowLeft") {
    enemy.keys.a.pressed = false;
  } else if (event.key == "ArrowDown" && enemy.crouched == true) {
    enemy.position.y -= enemy.dimensions.height;
    enemy.dimensions.height *= 2;
    enemy.crouched = false;
  }
});
