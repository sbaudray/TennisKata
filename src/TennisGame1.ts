import { TennisGame } from "./TennisGame";

class Player {
  name: string;
  points = 0;

  constructor(name) {
    this.name = name;
  }

  scorePoint() {
    this.points += 1;
  }
}

export class TennisGame1 implements TennisGame {
  player1: Player;
  player2: Player;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.name) this.player1.scorePoint();
    else this.player2.scorePoint();
  }

  draw() {
    return this.player1.points === this.player2.points;
  }

  drawScore() {
    switch (this.player1.points) {
      case 0:
        return "Love-All";
      case 1:
        return "Fifteen-All";
      case 2:
        return "Thirty-All";
      default:
        return "Deuce";
    }
  }

  advantage() {
    return this.somePlayerAboveForty() && this.pointsDiffEqualsOne();
  }

  advantageScore() {
    if (this.player1.points > this.player2.points)
      return `Advantage ${this.player1.name}`;

    return `Advantage ${this.player2.name}`;
  }

  somePlayerAboveForty() {
    return this.player1.points > 3 || this.player2.points > 3;
  }

  pointsDiffAboveOne() {
    let diff = this.player1.points - this.player2.points;

    return Math.abs(diff) > 1;
  }

  pointsDiffEqualsOne() {
    let diff = this.player1.points - this.player2.points;

    return Math.abs(diff) === 1;
  }

  win() {
    return this.somePlayerAboveForty() && this.pointsDiffAboveOne();
  }

  winScore() {
    if (this.player1.points > this.player2.points) {
      return `Win for ${this.player1.name}`;
    }
    return `Win for ${this.player2.name}`;
  }

  defaultScore() {
    let scores = ["Love", "Fifteen", "Thirty", "Forty"];

    return scores[this.player1.points] + "-" + scores[this.player2.points];
  }

  getScore(): string {
    if (this.draw()) {
      return this.drawScore();
    }

    if (this.win()) {
      return this.winScore();
    }

    if (this.advantage()) {
      return this.advantageScore();
    }

    return this.defaultScore();
  }
}
