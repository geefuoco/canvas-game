import Shape from "./shape.js";
export default class MovableShape extends Shape {
  constructor(context, x, y, radius, color, velocity) {
    super(context, x, y, radius, color);
    this.velocity = velocity;
  }

  update() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
