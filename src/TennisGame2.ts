import { TennisGame } from "./TennisGame";

let scores = ["Love", "Fifteen", "Thirty", "Forty"];

export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

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

  private get p1Wins() {
    return (
      this.P2point >= 4 && this.P1point >= 0 && this.P2point - this.P1point >= 2
    );
  }

  private get p2Wins() {
    return (
      this.P1point >= 4 && this.P2point >= 0 && this.P1point - this.P2point >= 2
    );
  }

  private get advantageP2() {
    return (
      this.P2point > this.P1point &&
      this.P1point >= 3 &&
      this.P2point - this.P1point < 2
    );
  }

  private get advantageP1() {
    return (
      this.P1point > this.P2point &&
      this.P2point >= 3 &&
      this.P1point - this.P2point < 2
    );
  }

  getScore(): string {
    if (this.deuce) return "Deuce";

    if (this.draw) {
      return scores[this.P1point] + "-All";
    }

    if (this.p1Wins) {
      return "Win for player2";
    }

    if (this.p2Wins) {
      return "Win for player1";
    }

    if (this.advantageP1) {
      return "Advantage player1";
    }

    if (this.advantageP2) {
      return "Advantage player2";
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
