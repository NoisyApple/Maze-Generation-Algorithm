require("./style.scss");
const p5 = require("p5");
import Maze from "./Maze";

let width = 500;
let height = 500;
let resolution = 10;

let maze;

const sketch = (p5) => {
  p5.setup = () => {
    let canvas = p5.createCanvas(width, height);
    canvas.parent("Canvas");

    maze = new Maze(p5, { width, height, resolution });
  };

  p5.draw = () => {
    p5.background(200);
    maze.draw();
  };
};

new p5(sketch);
