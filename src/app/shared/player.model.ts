import { Subject } from 'rxjs/Subject';

export class Player {
  public score: number[];
  private currentScoreDisplayed = 0;

  constructor(public name: string) {
    this.resetScores();
  }

  resetScores(): void {
    this.score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  incrementScore(hole: number): number {
    hole = hole - 1;
    this.currentScoreDisplayed = this.score[hole] ++ ;
    return this.currentScoreDisplayed;
  }

  decrementScore(hole: number): number {
    hole = hole - 1;
    this.currentScoreDisplayed = this.score[hole] > 0 ?
      this.score[hole] -- : this.score[hole] = 0 ;
    return this.currentScoreDisplayed;
  }

  setScore(score: number, hole: number): void {
    hole = hole - 1;
    this.score[hole] = score;
  }

  getCurrentScoreDisplayed(hole: number) {
    return this.score[hole - 1] ;
  }

  setCurrentScoreDisplayed(score: number) {
    this.currentScoreDisplayed = score;
  }

  getFront9Score(): number {
    let totalFront9Score = 0;
    for (let index = 0; index < 9 ; ++index) {
      totalFront9Score = totalFront9Score + this.score[index];
    }
    return totalFront9Score;
  }

  getBack9Score(): number {
    let totalBack9Score = 0;
    for (let index = 9; (index < 18) ; ++index) {
      totalBack9Score = totalBack9Score + this.score[index];
    }
    return totalBack9Score;
  }

  getPlayerTotalScore(): number {
    return this.score.reduce((total, num) => total + num, 0);
  }

  getPlayerScores(): number[] {
    return this.score;
  }

}
