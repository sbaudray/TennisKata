import { TennisGame } from "./TennisGame";

export class TennisGame3 implements TennisGame {
  private p2: number = 0;
  private p1: number = 0;
  private p1N: string;
  private p2N: string;

  constructor(p1N: string, p2N: string) {
    this.p1N = p1N;
    this.p2N = p2N;
  }

  getScore(): string {
    if (this.deuce) return "Deuce";

    if (this.playingBelowAdvantage) {
      let scores: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
      let p1Score = scores[this.p1];
      let p2Score = scores[this.p2];

      return this.draw ? p1Score + "-All" : p1Score + "-" + p2Score;
    }

    return this.somePlayerAboveByOnePoint
      ? "Advantage " + this.winningPlayerName
      : "Win for " + this.winningPlayerName;
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.p1 += 1;
    else this.p2 += 1;
  }

  private get p1AboveP2() {
    return this.p1 > this.p2;
  }

  private get pointsDiff() {
    return Math.abs(this.p1 - this.p2);
  }

  private get somePlayerAboveByOnePoint() {
    return this.pointsDiff === 1;
  }

  private get playingBelowAdvantage() {
    return this.p1 < 4 && this.p2 < 4;
  }

  private get deuce() {
    return this.draw && this.p1 >= 3;
  }

  private get draw() {
    return this.p1 === this.p2;
  }

  private get winningPlayerName() {
    return this.p1AboveP2 ? this.p1N : this.p2N;
  }
}
