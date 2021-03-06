import { GameID } from './gameID.model';
import { Scores } from './score.model';

export interface Game {
  outingID?: string;
  createDate: Date;
  userID: String;
  gamePlayers?: Scores[];
  gameID?: string;
}
