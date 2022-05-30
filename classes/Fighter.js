// Define Fighter Class
class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    dimensions,
    color = "red",
    imageSrc,
    scale = 1,
    frames = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      dimensions,
      imageSrc,
      scale,
      frames,
      offset,
    });
    this.velocity = velocity;
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
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.attacking = false;
    this.health = 100;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.holdFrames = 5;
    this.sprites = sprites;
    this.dead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
    console.log(this.sprites);
  }

  update() {
    this.draw();
    if (!this.dead) {
      this.animateFrames();
    }

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (
      this.position.y + this.dimensions.height + this.velocity.y >
      canvas.height - 96
    ) {
      this.velocity.y = 0;
      console.log(this.position.y);
      this.position.y = 331;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.switchSprite("attack1");
    this.attacking = true;
  }

  switchSprite(sprite) {
    // Overriding all animations if DEAD
    if (this.image === this.sprites.death.image) {
      if (this.currentFrame === this.sprites.death.frames - 1) {
        this.dead = true;
      }
      return;
    }

    // Overriding all animations if attacking
    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.frames - 1
    )
      return;

    // Overriding all animations if taking hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.currentFrame < this.sprites.takeHit.frames - 1
    )
      return;

    switch (sprite) {
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.frames = this.sprites.attack1.frames;
          this.currentFrame = 0;
        }
        break;
      case "attack2":
        if (this.image !== this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image;
          this.frames = this.sprites.attack2.frames;
          this.currentFrame = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.frames = this.sprites.death.frames;
          this.currentFrame = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.frames = this.sprites.fall.frames;
          this.currentFrame = 0;
        }
        break;
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.frames = this.sprites.idle.frames;
          this.currentFrame = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.frames = this.sprites.jump.frames;
          this.currentFrame = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.frames = this.sprites.run.frames;
          this.currentFrame = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.frames = this.sprites.takeHit.frames;
          this.currentFrame = 0;
        }
        break;
      case "takeHitWhite":
        if (this.image !== this.sprites.takeHitWhite.image) {
          this.image = this.sprites.takeHitWhite.image;
          this.frames = this.sprites.takeHitWhite.frames;
          this.currentFrame = 0;
        }
        break;
    }
  }

  takeHit() {
    if (timer <= 0) {
      return
    }

    this.health -= 20;

    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }
}
