// Define Sprite Class
class Sprite {
  constructor({
    position,
    dimensions,
    imageSrc,
    scale = 1,
    frames = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.dimensions = dimensions;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frames = frames;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.holdFrames = 5;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.frames),
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width * this.scale) / this.frames,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    if (++this.elapsedFrames % this.holdFrames === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.frames;
    }
  }

  update() {
    this.draw();
    this.animateFrames()
  }
}
