export default class Shape {
  constructor(context, x, y, radius, color) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  drawArc() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 360);
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}
