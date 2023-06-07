export class Mover {
  width: number;
  height: number;
  x: number = 100;
  y: number = 100;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
