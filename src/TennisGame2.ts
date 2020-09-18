import { TennisGame } from "./TennisGame";

let scores = ["Love", "Fifteen", "Thirty", "Forty"];

export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  P1res: string = "";
  P2res: string = "";

  private player1Name: string;

  constructor(player1Name: string) {
    this.player1Name = player1Name;
  }

  private get draw() {
    return this.P1point === this.P2point && this.P1point < 3;
  }

  private get deuce() {
    return this.P1point === this.P2point && this.P1point >= 3;
  }

  getScore(): string {
    if (this.deuce) return "Deuce";

    if (this.draw) {
      return scores[this.P1point] + "-All";
    }

    if (
      this.P2point >= 4 &&
      this.P1point >= 0 &&
      this.P2point - this.P1point >= 2
    ) {
      return "Win for player2";
    }

    if (
      this.P1point >= 4 &&
      this.P2point >= 0 &&
      this.P1point - this.P2point >= 2
    ) {
      return "Win for player1";
    }

    if (
      (this.P1point > 0 && this.P2point === 0) ||
      (this.P2point > 0 && this.P1point === 0) ||
      (this.P1point > this.P2point && this.P1point < 4) ||
      (this.P2point > this.P1point && this.P2point < 4)
    ) {
      this.P1res = scores[this.P1point];
      this.P2res = scores[this.P2point];

      return this.P1res + "-" + this.P2res;
    }

    if (
      this.P1point > this.P2point &&
      this.P2point >= 3 &&
      this.P1point - this.P2point < 2
    ) {
      return "Advantage player1";
    }

    if (
      this.P2point > this.P1point &&
      this.P1point >= 3 &&
      this.P2point - this.P1point < 2
    ) {
      return "Advantage player2";
    }
  }

  P1Score(): void {
    this.P1point++;
  }

  P2Score(): void {
    this.P2point++;
  }

  wonPoint(player: string): void {
    if (player === this.player1Name) this.P1Score();
    else this.P2Score();
  }
}
