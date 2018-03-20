import { Scores } from './score.model';

export interface Game {
  outingID?: string;
  createDate: Date;
  playerScores: Scores[];
}
