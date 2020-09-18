import { TennisGame } from "./TennisGame";

let scores = ["Love", "Fifteen", "Thirty", "Forty"];

export class TennisGame1 implements TennisGame {
  private player1: TennisPlayer;
  private player2: TennisPlayer;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = TennisPlayer.new(player1Name);
    this.player2 = TennisPlayer.new(player2Name);
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.name) this.player1.scorePoint();
    else this.player2.scorePoint();
  }

  getScore(): string {
    let ruler = TennisRuler.new(this.player1.points, this.player2.points);

    if (ruler.draw) {
      return this.drawScore;
    }

    if (ruler.win) {
      return this.winScore;
    }

    if (ruler.advantage) {
      return this.advantageScore;
    }

    return this.defaultScore;
  }

  private get drawScore() {
    let points = this.player1.points;

    switch (points) {
      case 0:
      case 1:
      case 2:
        return `${scores[points]}-All`;
      default:
        return "Deuce";
    }
  }

  private get playerWinning() {
    return this.player1.points > this.player2.points
      ? this.player1
      : this.player2;
  }

  private get advantageScore() {
    return `Advantage ${this.playerWinning.name}`;
  }

  private get winScore() {
    return `Win for ${this.playerWinning.name}`;
  }

  private get defaultScore() {
    return scores[this.player1.points] + "-" + scores[this.player2.points];
  }
}

class TennisRuler {
  p1Points: number;
  p2Points: number;

  private constructor(p1Points, p2Points) {
    this.p1Points = p1Points;
    this.p2Points = p2Points;
  }

  static new(p1Points, p2Points) {
    return new TennisRuler(p1Points, p2Points);
  }

  private get somePlayerAboveForty() {
    return this.p1Points > 3 || this.p2Points > 3;
  }

  private get pointsDiff() {
    return Math.abs(this.p1Points - this.p2Points);
  }

  private get pointsDiffAboveOne() {
    return this.pointsDiff > 1;
  }

  private get pointsDiffEqualsOne() {
    return this.pointsDiff === 1;
  }

  private get pointsDiffNull() {
    return this.pointsDiff === 0;
  }

  get draw() {
    return this.pointsDiffNull;
  }

  get win() {
    return this.somePlayerAboveForty && this.pointsDiffAboveOne;
  }

  get advantage() {
    return this.somePlayerAboveForty && this.pointsDiffEqualsOne;
  }
}

class TennisPlayer {
  name: string;
  points = 0;

  private constructor(name) {
    this.name = name;
  }

  static new(name) {
    return new TennisPlayer(name);
  }

  scorePoint() {
    this.points += 1;
  }
}
