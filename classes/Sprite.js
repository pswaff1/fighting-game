// Define Sprite Class
class Sprite {
  constructor({ position, dimensions, imageSrc, scale = 1, frames = 1 }) {
    this.position = position;
    this.dimensions = dimensions;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frames = frames;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.holdFrames = 5;
  }

  draw() {
    c.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.frames),
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width * this.scale) / this.frames,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    if (++this.elapsedFrames % this.holdFrames === 0) {
      this.currentFrame = (this.currentFrame + 1) % this.frames;
    }
  }
}
