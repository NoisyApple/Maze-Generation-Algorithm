import Cell from "./Cell";

export default class Maze {
  constructor(p5, canvas) {
    this.p5 = p5;
    this.cells = new Array(canvas.resolution);
    this.canvas = canvas;

    for (let i = 0; i < this.cells.length; i++)
      this.cells[i] = new Array(canvas.resolution); // Bidimensional array.

    for (let col = 0; col < this.cells.length; col++)
      for (let row = 0; row < this.cells[col].length; row++)
        this.cells[col][row] = new Cell(this.p5, col, row, this.canvas); // Array is filled with cells.
  }

  draw() {
    this.cells.forEach((col) => {
      col.forEach((cell) => {
        cell.draw();
      });
    });
  }
}
