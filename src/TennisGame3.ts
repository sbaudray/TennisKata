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

  get playingBelowForty() {
    return this.p1 < 4 && this.p2 < 4;
  }

  get notDeuce() {
    return !(this.p1 + this.p2 === 6);
  }

  get draw() {
    return this.p1 === this.p2;
  }

  getScore(): string {
    let s: string;
    if (this.playingBelowForty && this.notDeuce) {
      const p: string[] = ["Love", "Fifteen", "Thirty", "Forty"];
      s = p[this.p1];
      return this.draw ? s + "-All" : s + "-" + p[this.p2];
    } else {
      if (this.draw) return "Deuce";
      s = this.p1AboveP2 ? this.p1N : this.p2N;
      return this.p1Diff ** 2 === 1 ? "Advantage " + s : "Win for " + s;
    }
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.p1 += 1;
    else this.p2 += 1;
  }
}
