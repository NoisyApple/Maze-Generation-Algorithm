import Cell from "./Cell";

export default class Maze {
  constructor(p5, canvas) {
    this.p5 = p5;
    this.cells = new Array(canvas.resolution);
    this.canvas = canvas;
    this.pathStack = [];
    this.currentCell = undefined;
    this.mazeEnd = undefined;
    this.solutionPath = [];

    // Bidimensional array.
    for (let i = 0; i < this.cells.length; i++)
      this.cells[i] = new Array(canvas.resolution);

    // Array is filled with cells.
    for (let col = 0; col < this.cells.length; col++)
      for (let row = 0; row < this.cells[col].length; row++)
        this.cells[col][row] = new Cell(this.p5, col, row, this.canvas);

    this.current = this.cells[0][0]; // Left top corner cell is the beginning;
    this.mazeEnd = this.cells[canvas.resolution - 1][canvas.resolution - 1]; // Maze end.
  }

  // Maze cells are drawn and pattern its generated.
  draw() {
    this.cells.forEach((col) => {
      col.forEach((cell) => {
        cell.draw();
      });
    });

    // Shows the solution.
    if (this.pathStack.length == 0 && this.solutionPath.length > 0) {
      this.solutionPath.forEach((cell) => cell.highlight("#2a2a2a"));
    }

    this.generatePattern();
  }

  // Generates the next iteration of the maze pattern while there are not visited cells.
  generatePattern() {
    // Current cell is highlighted.
    if (this.pathStack.length > 0) this.current.highlight("#ff0054");

    // Stores the solution.
    if (this.current == this.mazeEnd && this.solutionPath.length == 0)
      this.solutionPath = [...this.pathStack, this.current];

    // Current cell is visited.
    this.current.visited = true;

    // Not visited neighbours of current cell.
    let neighbours = this.getCellNeighbours(this.current).filter(
      (cell) => !cell.visited
    );

    // Unvisited neighbours available.
    if (neighbours.length > 0) {
      // A neighbour is chosen.
      let chosenNeighbour =
        neighbours[Math.floor(Math.random() * neighbours.length)];

      // Chosen neighbour is visited.
      chosenNeighbour.visited = true;

      // Current cell is added to the pathStack.
      this.pathStack.push(this.current);

      // Walls between current cell and chosen neighbour are deleted.
      this.breakWalls(this.current, chosenNeighbour);

      // Chosen neighbour is now the current cell.
      this.current = chosenNeighbour;

      // No unvisited neighbours available.
    } else if (this.pathStack.length > 0) {
      // A cell is taken from the pathStack and set as new current.
      this.current = this.pathStack.pop();
    }
  }

  // Returns an array with the adyacent neighbours of a cell (not diagonally).
  getCellNeighbours(cell) {
    let neighbours = [];
    let x = cell.x;
    let y = cell.y;

    // Surroungind neighbours loop.
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let neighbour = undefined;

        // Only accepts indexes between the bounds of the bidimensional array.
        if (
          x + i >= 0 &&
          x + i < this.canvas.resolution &&
          y + j >= 0 &&
          y + j < this.canvas.resolution
        )
          neighbour = this.cells[x + i][y + j];

        // Excludes undefined neighbours and diagonal neighbours.
        if (neighbour != undefined && Math.abs(i) ^ Math.abs(j))
          neighbours.push(neighbour);
      }
    }

    return neighbours;
  }

  // Break walls between cellA and cellB.
  breakWalls(cellA, cellB) {
    // cellA's position relative to cellB.
    let x = cellA.x - cellB.x;
    let y = cellA.y - cellB.y;

    // TOP.
    if (x == 0 && y == -1) {
      cellB.walls[Cell.TOP] = false;
      cellA.walls[Cell.BOTTOM] = false;

      // RIGTH.
    } else if (x == 1 && y == 0) {
      cellB.walls[Cell.RIGHT] = false;
      cellA.walls[Cell.LEFT] = false;

      // BOTTOM.
    } else if (x == 0 && y == 1) {
      cellB.walls[Cell.BOTTOM] = false;
      cellA.walls[Cell.TOP] = false;

      // LEFT.
    } else if (x == -1 && y == 0) {
      cellB.walls[Cell.LEFT] = false;
      cellA.walls[Cell.RIGHT] = false;
    }
  }
}
