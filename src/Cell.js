export default class Cell {
  static TOP = 0;
  static RIGHT = 1;
  static BOTTOM = 2;
  static LEFT = 3;

  constructor(p5, x, y, canvas) {
    this.p5 = p5;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true];
  }

  draw() {
    let { width, height, resolution } = this.canvas;
    let xStep = width / resolution;
    let yStep = height / resolution;

    // Line walls are drawn.
    this.walls.forEach((wall, i) => {
      if (wall) {
        switch (i) {
          case Cell.TOP:
            this.p5.line(
              this.x * xStep,
              this.y * yStep,
              (this.x + 1) * xStep,
              this.y * yStep
            );
            break;
          case Cell.RIGHT:
            this.p5.line(
              (this.x + 1) * xStep,
              this.y * yStep,
              (this.x + 1) * xStep,
              (this.y + 1) * yStep
            );
            break;
          case Cell.BOTTOM:
            this.p5.line(
              (this.x + 1) * xStep,
              (this.y + 1) * yStep,
              this.x * xStep,
              (this.y + 1) * yStep
            );
            break;
          case Cell.LEFT:
            this.p5.line(
              this.x * xStep,
              (this.y + 1) * yStep,
              this.x * xStep,
              this.y * yStep
            );
            break;
        }
      }
    });
  }
}
