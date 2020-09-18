import { TennisGame } from "./TennisGame";

let scores = ["Love", "Fifteen", "Thirty", "Forty"];

export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  private get draw() {
    return this.P1point === this.P2point && this.P1point < 3;
  }

  private get deuce() {
    return this.P1point === this.P2point && this.P1point >= 3;
  }

  private get p1AboveForty() {
    return this.P1point >= 4;
  }

  private get p2AboveForty() {
    return this.P2point >= 4;
  }

  private get p1DiffAboveOne() {
    return this.P1point - this.P2point >= 2;
  }

  private get p2DiffAboveOne() {
    return this.P2point - this.P1point >= 2;
  }

  private get p1DiffEqualsOne() {
    return this.P1point - this.P2point === 1;
  }

  private get p2DiffEqualsOne() {
    return this.P2point - this.P1point === 1;
  }

  private get p1Wins() {
    return this.p1AboveForty && this.p1DiffAboveOne;
  }

  private get p2Wins() {
    return this.p2AboveForty && this.p2DiffAboveOne;
  }

  private get somePlayerAboveForty() {
    return this.P1point > 3 || this.P2point > 3;
  }

  private get advantageP1() {
    return this.somePlayerAboveForty && this.p1DiffEqualsOne;
  }

  private get advantageP2() {
    return this.somePlayerAboveForty && this.p2DiffEqualsOne;
  }

  getScore(): string {
    if (this.deuce) return "Deuce";

    if (this.draw) {
      return scores[this.P1point] + "-All";
    }

    if (this.p1Wins) {
      return `Win for ${this.player1Name}`;
    }

    if (this.p2Wins) {
      return `Win for ${this.player2Name}`;
    }

    if (this.advantageP1) {
      return `Advantage ${this.player1Name}`;
    }

    if (this.advantageP2) {
      return `Advantage ${this.player2Name}`;
    }

    return scores[this.P1point] + "-" + scores[this.P2point];
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
