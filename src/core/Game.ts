import { Mover } from "./Mover";

export class Game {
  width: number;
  height: number;
  score: number = 0;
  mover: Mover;

  constructor(width: number, height: number, mover: Mover) {
    this.width = width;
    this.height = height;
    this.mover = mover;
  }

  addScore(): void {
    this.score++;
  }

  endGame(): void {
    this.score = 0;
  }

  moveMover(): void {
    const moverX = Math.floor(Math.random() * (this.width - this.mover.width));
    const moverY = Math.floor(
      Math.random() * (this.height - this.mover.height)
    );
    this.mover.moveTo(moverX, moverY);
  }
}
