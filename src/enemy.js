import MovableShape from "./movableShape.js";
export default class Enemy extends MovableShape {
  constructor(context, x, y, radius, color, velocity) {
    super(context, x, y, radius, color, velocity);
  }
}
