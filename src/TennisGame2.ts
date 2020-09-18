import { TennisGame } from "./TennisGame";

export class TennisGame2 implements TennisGame {
  private P1point: number = 0;
  private P2point: number = 0;

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore() {
    let ruler = TennisRuler.new(this.P1point, this.P2point);

    let scores = ["Love", "Fifteen", "Thirty", "Forty"];

    if (ruler.deuce) return "Deuce";

    if (ruler.draw) {
      return scores[this.P1point] + "-All";
    }

    if (ruler.p1Wins) {
      return `Win for ${this.player1Name}`;
    }

    if (ruler.p2Wins) {
      return `Win for ${this.player2Name}`;
    }

    if (ruler.advantageP1) {
      return `Advantage ${this.player1Name}`;
    }

    if (ruler.advantageP2) {
      return `Advantage ${this.player2Name}`;
    }

    return scores[this.P1point] + "-" + scores[this.P2point];
  }

  wonPoint(player: string) {
    if (player === this.player1Name) this.P1Score();
    else this.P2Score();
  }

  private P1Score() {
    this.P1point++;
  }

  private P2Score() {
    this.P2point++;
  }
}

class TennisRuler {
  P1point: number;
  P2point: number;

  private constructor(p1Points: number, p2Points: number) {
    this.P1point = p1Points;
    this.P2point = p2Points;
  }

  static new(p1Points: number, p2Points: number) {
    return new TennisRuler(p1Points, p2Points);
  }

  private get pointsDiff() {
    return Math.abs(this.P1point - this.P2point);
  }

  private get p1AboveP2() {
    return this.P1point > this.P2point;
  }

  private get p2AboveP1() {
    return this.P2point > this.P1point;
  }

  private get pointsDiffNull() {
    return this.P1point === this.P2point;
  }

  private get pointsDiffAboveOne() {
    return this.pointsDiff >= 2;
  }

  private get pointsDiffEqualsOne() {
    return this.pointsDiff === 1;
  }

  private get somePlayerAboveForty() {
    return this.P1point > 3 || this.P2point > 3;
  }

  private get somePlayerBelowForty() {
    return this.P1point < 3 || this.P2point < 3;
  }

  private get somePlayerAboveThirty() {
    return this.P1point >= 3 || this.P2point >= 3;
  }

  get draw() {
    return this.pointsDiffNull && this.somePlayerBelowForty;
  }

  get deuce() {
    return this.pointsDiffNull && this.somePlayerAboveThirty;
  }

  get p1Wins() {
    return (
      this.somePlayerAboveForty && this.p1AboveP2 && this.pointsDiffAboveOne
    );
  }

  get p2Wins() {
    return (
      this.somePlayerAboveForty && this.p2AboveP1 && this.pointsDiffAboveOne
    );
  }

  get advantageP1() {
    return (
      this.somePlayerAboveForty && this.p1AboveP2 && this.pointsDiffEqualsOne
    );
  }

  get advantageP2() {
    return (
      this.somePlayerAboveForty && this.p2AboveP1 && this.pointsDiffEqualsOne
    );
  }
}
