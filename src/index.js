require("./style.scss");
const p5 = require("p5");
import Maze from "./Maze";

// Bounds.
let width = 500;
let height = 500;

// Cells per row and column.
let resolution = 25;

let maze; // Maze reference.

const sketch = (p5) => {
  // Canvas setup.
  p5.setup = () => {
    let canvas = p5.createCanvas(width, height);
    canvas.parent("Canvas");
    maze = new Maze(p5, { width, height, resolution });
  };

  // Draw loop.
  p5.draw = () => {
    p5.background(200);
    maze.draw();
  };
};

new p5(sketch);
