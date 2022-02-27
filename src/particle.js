import MovableShape from "./movableShape.js";
export default class Particle extends MovableShape {
  constructor(context, x, y, radius, color, velocity) {
    super(context, x, y, radius, color, velocity);
    this.alpha = 1;
    this.friction = 0.99;
  }

  drawArc() {
    this.context.save();
    this.context.globalAlpha = this.alpha;
    super.drawArc();
    this.context.restore();
  }

  update() {
    super.update();
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.alpha -= 0.01;
  }
}
