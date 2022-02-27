import MovableShape from "./movableShape.js";
export default class Player extends MovableShape {
  constructor(context, x, y, radius, color, velocity) {
    super(context, x, y, radius, color, velocity);
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          this.velocity.y = -0.9;
          break;
        case "s":
          this.velocity.y = 0.9;
          break;
        case "a":
          this.velocity.x = -0.9;
          break;
        case "d":
          this.velocity.x = 0.9;
          break;
        default:
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
        case "s":
          this.velocity.y = 0;
          break;
        case "a":
        case "d":
          this.velocity.x = 0;
          break;
        default:
          break;
      }
    });
  }
}
