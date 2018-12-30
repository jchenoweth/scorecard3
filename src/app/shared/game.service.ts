import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';

import { BehaviorSubject ,  Observable ,  Subject } from 'rxjs';
import { Game } from './game.model';
// import { GameID } from './gameID.model';
import { Team } from './team.model';
import { Player } from '../shared/player.model';
import { Scores } from './score.model';
import { Course } from './course.model';
import { UIService } from '../shared/ui.service';

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
  // private isScoreCardDirty: boolean;
  private isScoreCardDirty = false;
  private gameID = '';
  private scoreID = '';
  private scoreArray: Scores[];
  private scoreInfo = {};
  private gameInfo: Observable<Game[]>;
  private scoresDoc: AngularFirestoreDocument<Scores>;

  constructor(private af2: AngularFirestore, public uiService: UIService) {
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

  loadSavedGame(gameToLoad) {
    //  console.log(gameToLoad);
     this.initializeGame();
     this.gameID = gameToLoad.outingID;
     let playerNumber = 0;
     gameToLoad.data.playerScores.forEach(player => {
       console.log(player.playerScores);
       console.log('currentPlayerNumber: ' + this.currentPlayerNumber);
       console.log('this.getCurrentPlayer(): ' + this.getCurrentPlayer());
       this.getCurrentPlayer().score = player.playerScores;
       this.getCurrentPlayer().name = player.playerName;
      //  this.setCurrentPlayerNumber(playerNumber++);
     });
  }

  setScoreCardDirty(dirtyFlag) {
    this.isScoreCardDirty = dirtyFlag;
  }

  getScoreCardDirty(): boolean {
    return this.isScoreCardDirty;
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

  addNewGameIDToDatabase() {
    const gamesCollection = this.af2.collection<Game>('game');
      gamesCollection.add({
        outingID: 'test outing',
        createDate: new Date(),
        playerScores: this.getScoreInfo(),
        gameID: '' })
      .then(docRef => {
        this.gameID = docRef.id;
        console.log('addNewGameIDToDatabase():this.gameID: ' + this.gameID);
        // this.updatePlayerScoresOnGame(this.gameID);
      })
      .catch(error => {
        console.log('gamesCollection.add: error' + error );
        this.uiService.showSnackbar(error.message, null, 5000);
      });
  }

  updatePlayerScoresOnGame(newGameID) {
    const gameDocRef = this.af2.collection<Game>('game').doc(newGameID);
    gameDocRef.update({
      playerScores: this.getScoreInfo(),
      gameID: newGameID})
    .then(() => {
      this.uiService.showSnackbar('Game Updated', null, 5000);
    })
    .catch(error => {
      console.log('Error updating player scores on Game:' + error );
      this.uiService.showSnackbar(error.message, null, 5000);
    });
  }


  saveScoreCard() {
    if (this.gameID === '') {
      this.addNewGameIDToDatabase();
    } else {
      this.updatePlayerScoresOnGame(this.gameID);
    }
  }

  getScoreInfo(): Scores[] {
    const scoreArray: Scores[] = [];
    this.getPlayers().forEach( (player, playerNbr) => {
      scoreArray.push( {
        userID: 'jchenoweth1@gmail.com',
        playerName: player.name,
        playerScores: player.getPlayerScores()
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
