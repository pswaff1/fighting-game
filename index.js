// import Sprite from "/Sprite.js";

// Set up canvas for editing
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 1024;
canvas.height = 576;

// Set gravity
const gravity = 0.7;

// Set Background image
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

// Set shop sprite
const shop = new Sprite({
  position: {
    x: canvas.width / 2 + 120,
    y: canvas.height - 96 - 128 * 2.75,
  },
  scale: 2.75,
  frames: 6,
  imageSrc: "./img/shop.png",
});

// Create charactor Sprite
const player = new Fighter({
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
  offset: {
    x: 215,
    y: 185,
  },
  scale: 2.75,
  frames: 8,
  imageSrc: "./img/samuraiMack/Idle.png",
  sprites: {
    attack1: {
      imageSrc: "./img/samuraiMack/Attack1.png",
      frames: 6,
    },
    attack2: {
      imageSrc: "./img/samuraiMack/Attack2.png",
      frames: 6,
    },
    death: {
      imageSrc: "./img/samuraiMack/Death.png",
      frames: 6,
    },
    fall: {
      imageSrc: "./img/samuraiMack/Fall.png",
      frames: 2,
    },
    idle: {
      imageSrc: "./img/samuraiMack/Idle.png",
      frames: 8,
    },
    jump: {
      imageSrc: "./img/samuraiMack/Jump.png",
      frames: 2,
    },
    run: {
      imageSrc: "./img/samuraiMack/Run.png",
      frames: 8,
    },
    takeHitWhite: {
      imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
      frames: 4,
    },
    takeHit: {
      imageSrc: "./img/samuraiMack/Take Hit.png",
      frames: 4,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 200,
    height: 50,
  },
});

// Create enemey Sprite
const enemy = new Fighter({
  position: {
    x: 915,
    y: 100,
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
  offset: {
    x: 215,
    y: 200,
  },
  scale: 2.75,
  frames: 4,
  imageSrc: "./img/kenji/Idle.png",
  sprites: {
    attack1: {
      imageSrc: "./img/kenji/Attack1.png",
      frames: 4,
    },
    attack2: {
      imageSrc: "./img/kenji/Attack2.png",
      frames: 4,
    },
    death: {
      imageSrc: "./img/kenji/Death.png",
      frames: 7,
    },
    fall: {
      imageSrc: "./img/kenji/Fall.png",
      frames: 2,
    },
    idle: {
      imageSrc: "./img/kenji/Idle.png",
      frames: 4,
    },
    jump: {
      imageSrc: "./img/kenji/Jump.png",
      frames: 2,
    },
    run: {
      imageSrc: "./img/kenji/Run.png",
      frames: 8,
    },
    takeHit: {
      imageSrc: "./img/kenji/Take hit.png",
      frames: 3,
    },
  },
  attackBox: {
    offset: {
      x: -165,
      y: 50,
    },
    width: 185,
    height: 50,
  },
});

// Updates game timer
decreaseTimer();

// Animating canvas
function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "red";

  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // Move player horizontally and player sprite selection

  if (player.keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else if (player.keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // Move enemy horizontally
  if (enemy.keys.d.pressed && enemy.lastKey === "d") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else if (enemy.keys.a.pressed && enemy.lastKey === "a") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // Detect player hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.attacking &&
    player.currentFrame === 4
  ) {
    enemy.takeHit();
    player.attacking = false;

    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }

  // If player misses
  if (player.attacking && player.currentFrame === 4) {
    player.attacking = false;
  }

  // Detect enemy hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.attacking &&
    enemy.currentFrame === 2
  ) {
    player.takeHit();
    enemy.attacking = false;
    document.querySelector("#playerHealth").style.width = player.health + "%";
  }

  // If player misses
  if (enemy.attacking && enemy.currentFrame === 2) {
    enemy.attacking = false;
  }

  // Determine winner
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerID });
  }
}
animate();

// Listen for key presses
window.addEventListener("keydown", (event) => {
  // console.log(event.key)
  if (player.health > 0 && enemy.health > 0 && timer > 0) {
    // Player key presses
    if (event.key === "d" || event.key === "D") {
      player.keys.d.pressed = true;
      player.lastKey = "d";
    } else if (event.key == "a" || event.key === "A") {
      player.keys.a.pressed = true;
      player.lastKey = "a";
    } else if (
      (event.key == "w" || event.key === "W") &&
      player.position.y + player.dimensions.height >= canvas.height - 96
    ) {
      player.velocity.y = -15;
    } else if (event.key == " ") {
      player.attack();
    }

    // Enemy key presses
    if (event.key === "ArrowRight") {
      enemy.keys.d.pressed = true;
      enemy.lastKey = "d";
    } else if (event.key == "ArrowLeft") {
      enemy.keys.a.pressed = true;
      enemy.lastKey = "a";
    } else if (
      event.key == "ArrowUp" &&
      enemy.position.y + enemy.dimensions.height >= canvas.height - 96
    ) {
      enemy.velocity.y = -15;
    } else if (event.key == "0") {
      enemy.attack();
    }
  }
});

// Listen for key releases
window.addEventListener("keyup", (event) => {
  // Player keyups
  if (event.key == "d" || event.key === "D") {
    player.keys.d.pressed = false;
  } else if (event.key == "a" || event.key === "A") {
    player.keys.a.pressed = false;
  } else if (
    (event.key == "s" || event.key === "S") &&
    player.crouched == true
  ) {
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
