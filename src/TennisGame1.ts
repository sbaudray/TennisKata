import { TennisGame } from "./TennisGame";

let scores = ["Love", "Fifteen", "Thirty", "Forty"];

export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.m_score1 += 1;
    else this.m_score2 += 1;
  }

  equality() {
    return this.m_score1 === this.m_score2;
  }

  equalityScore() {
    switch (this.m_score1) {
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

  winOrAdvantage() {
    return this.m_score1 >= 4 || this.m_score2 >= 4;
  }

  winOrAdvantageScore() {
    const minusResult: number = this.m_score1 - this.m_score2;
    if (minusResult === 1) return "Advantage player1";
    else if (minusResult === -1) return "Advantage player2";
    else if (minusResult >= 2) return "Win for player1";
    return "Win for player2";
  }

  defaultScore() {
    return scores[this.m_score1] + "-" + scores[this.m_score2];
  }

  getScore(): string {
    if (this.equality()) {
      return this.equalityScore();
    }

    if (this.winOrAdvantage()) {
      return this.winOrAdvantageScore();
    }

    return this.defaultScore();
  }
}
