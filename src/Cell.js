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
    this.visited = false;
  }

  draw() {
    let { width, height, resolution } = this.canvas;
    let xStep = width / resolution;
    let yStep = height / resolution;

    if (this.visited) {
      this.p5.push();
      this.p5.noStroke();
      this.p5.fill("#BAD");
      this.p5.rect(this.x * xStep, this.y * yStep, xStep, yStep);
      this.p5.pop();
    }

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

  // Highligths the cell.
  highlight(color) {
    let { width, height, resolution } = this.canvas;
    let xStep = width / resolution;
    let yStep = height / resolution;

    this.p5.push();
    this.p5.noStroke();
    this.p5.fill(color);
    this.p5.rect(
      this.x * xStep + (xStep * 0.33) / 2,
      this.y * yStep + (yStep * 0.33) / 2,
      xStep - xStep * 0.33,
      yStep - yStep * 0.33
    );
    this.p5.pop();
  }
}
