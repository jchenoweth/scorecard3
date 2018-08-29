import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument  } from 'angularfire2/firestore';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Game } from './game.model';
// import { GameID } from './gameID.model';
import { Team } from './team.model';
import { Player } from '../shared/player.model';
import { Scores } from './score.model';
import { Course } from './course.model';

@Injectable()
export class GameService {
  private scoreToDisplayChanged = new BehaviorSubject<number>(0);
  private holeChanged = new BehaviorSubject<number>(1);
  private playerToDisplayChanged = new BehaviorSubject<number>(0);
  private scoreCardChanged = new Subject<boolean>();
  private teams: Team[] = [];
  private currentTeam: number;
  private currentHole: number;
  private currentPlayerNumber: number;
  private currentScore: number;
  private currentPlayer: Player;
  private currentTotScore: number;
  private players: Player[] = [];
  private currentCourse: Course;
  private scoreCardID: string;
  private isScoreCardDirty: boolean;
  private scoreCardDirty = false;
  private gameID;
  private scoreID = '';
  private scoreArray: Scores[];
  private scoreInfo = {};
  private gameInfo: Observable<Game[]>;
  private scoresDoc: AngularFirestoreDocument<Scores>;

  constructor(private afs: AngularFirestore) {
    this.initializeGame();
  }

  initializeGame(): void {
    this.addNewPlayer('Me');
    this.setCurrentHole(1);
    this.initializeScores();
    this.currentTeam = 1;
    this.setCurrentPlayerNumber(0);
    this.currentCourse = new Course('Default');
    this.setDirtyScoreCard(false);
    this.gameID = '';
  }

  initializeScores(): void {
    this.players.forEach(player => {
      player.resetScores();
    });
    this.currentScore = this.getCurrentScore();
    this.currentTotScore = this.getCurrentTotScore();
    this.scoreToDisplayChanged.next(this.getCurrentScore());
  }

  setScoreCardDirty(dirtyFlag) {
    this.scoreCardDirty = dirtyFlag;
  }

  getScoreCardDirty(): boolean {
    return this.scoreCardDirty;
  }

  resetGameID() {
    this.setDirtyScoreCard(false);
    this.gameID = '';
  }

  getCurrentCourse() {
    return this.currentCourse;
  }

  getScoreChangedNotification(): BehaviorSubject<number> {
    return this.scoreToDisplayChanged;
  }

  getHoleChangedNotification(): BehaviorSubject<number> {
    return this.holeChanged;
  }

  getPlayerChangedNotification(): BehaviorSubject<number> {
    return this.playerToDisplayChanged;
  }

  getCurrentPlayerNbr(): number {
    return this.currentPlayerNumber;
  }

  getCurrentPlayer(): Player {
    return this.players[this.getCurrentPlayerNbr()];
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getCurrentScore(): number {
    return this.getCurrentPlayer()
      .getCurrentScoreDisplayed(this.getCurrentHole());
  }

  getCurrentTotScore(): number {
    return this.getCurrentPlayer().getPlayerTotalScore();
  }

  updateHole(hole: number) {
    this.setCurrentHole(hole);
    this.scoreToDisplayChanged.next(this.getCurrentScore());
  }

  getCurrentHole(): number {
    return this.currentHole;
  }

  setCurrentHole(hole: number) {
    this.currentHole = hole;
    this.holeChanged.next(this.getCurrentHole());
  }

  updatePlayerName(name: string, playerNbr: number) {
    this.players[playerNbr].name = name;
    this.playerToDisplayChanged.next(this.getCurrentPlayerNbr());
  }

  deletePlayer(playerNbr: number) {
    this.players.splice(playerNbr, 1);

    if (this.players.length === 0 ) {
      this.initializeGame();
    } else {
      this.setCurrentPlayerNumber(0);
    }

    this.scoreToDisplayChanged.next(this.getCurrentScore());
    this.playerToDisplayChanged.next(this.getCurrentPlayerNbr());
    this.setDirtyScoreCard(true);
    }

  addNewPlayer(name: string) {
    this.setCurrentPlayerNumber(this.players.length);
    this.players[this.getCurrentPlayerNbr()] = new Player(name);
    this.setCurrentPlayer(this.players[this.getCurrentPlayerNbr()]);
    this.playerToDisplayChanged.next(this.getCurrentPlayerNbr());
    this.scoreToDisplayChanged.next(this.getCurrentScore());
    this.setDirtyScoreCard(true);
  }

  setCurrentPlayer(player: Player) {
    this.currentPlayer = player;
  }

  setCurrentPlayerNumber(playerNumber: number) {
    this.currentPlayerNumber = playerNumber;
  }

  prevPlayer() {
    if (this.getCurrentPlayerNbr() !== 0) {
      this.currentPlayerNumber--;
    } else {
      this.setCurrentPlayerNumber(this.players.length - 1);
    }
    this.playerToDisplayChanged.next(this.getCurrentPlayerNbr());
    this.scoreToDisplayChanged.next(this.getCurrentScore());
  }

  nextPlayer() {
    const numOfPlayers = this.players.length;
    if (numOfPlayers > 0) {
      if (this.getCurrentPlayerNbr() !== (numOfPlayers - 1)) {
        this.currentPlayerNumber++;
      } else {
        this.setCurrentPlayerNumber(0);
      }
    }
    this.playerToDisplayChanged.next(this.getCurrentPlayerNbr());
    this.scoreToDisplayChanged.next(this.getCurrentScore());
  }

  incrementScore() {
    this.currentScore = this.getCurrentPlayer()
      .incrementScore(this.getCurrentHole());
    this.currentTotScore = this.getCurrentPlayer()
      .getPlayerTotalScore();
    this.scoreToDisplayChanged.next(this.getCurrentScore());
    this.setDirtyScoreCard(true);
  }

  decrementScore() {
    this.currentScore = this.getCurrentPlayer()
      .decrementScore(this.getCurrentHole());
    this.currentTotScore = this.getCurrentPlayer()
      .getPlayerTotalScore();
    this.scoreToDisplayChanged.next(this.getCurrentScore());
    this.setDirtyScoreCard(true);
  }

  saveScoreCard() {
    if (this.gameID === '') {
      const gamesCollection = this.afs.collection<Game>('game');
      gamesCollection.add({
        outingID: 'test1',
        createDate: new Date(),
        playerScores: this.getScoreInfo()})
      .then(docRef => {
          this.gameID = docRef.id;
        })
      .catch(error => {
          console.log('gamesCollection.add:error ' + error );
        });
    } else {
        const gameDocRef = this.afs.collection<Game>('game').doc(this.gameID);
        gameDocRef.update({ playerScores: this.getScoreInfo() })
        .then(updateRef => {
          console.log('Existing Game update: ' + updateRef);
        })
        .catch(error => {
          console.log('Existing Game update error: ' + error );
        });
      }
  }

  getScoreInfo(): Scores[] {
    const scoreArray: Scores[] = [];
    this.getPlayers().forEach( (player, playerNbr) => {
      scoreArray.push( {
        userID: 'jchenoweth1@gmail.com',
        playerName: this.players[playerNbr].name,
        playerScores: this.players[playerNbr].getPlayerScores(),
        gameID: this.gameID
      });
    });
    return scoreArray;
  }

  setDirtyScoreCard(isDirty: boolean) {
    this.isScoreCardDirty = isDirty;
    this.scoreCardChanged.next(true);
  }

  getScoreCardChangedNotification(): Subject<boolean> {
    return this.scoreCardChanged;
  }
}
