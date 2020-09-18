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

  get p1AboveP2() {
    return this.p1 > this.p2;
  }

  get p1Diff() {
    return this.p1 - this.p2;
  }

  get playingBelowAdvantage() {
    return this.p1 < 4 && this.p2 < 4;
  }

  get notDeuce() {
    return !(this.p1 + this.p2 === 6);
  }

  get draw() {
    return this.p1 === this.p2;
  }

  getScore(): string {
    if (this.playingBelowAdvantage && this.notDeuce) {
      let scores: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
      let p1Score = scores[this.p1];
      return this.draw ? p1Score + "-All" : p1Score + "-" + scores[this.p2];
    } else {
      if (this.draw) return "Deuce";
      let winningPlayerName = this.p1AboveP2 ? this.p1N : this.p2N;
      return this.p1Diff ** 2 === 1
        ? "Advantage " + winningPlayerName
        : "Win for " + winningPlayerName;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.p1 += 1;
    else this.p2 += 1;
  }
}
