import { auth } from 'firebase';
import { AuthService } from './../auth/auth.service';
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
  private playerUID = '';
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

  constructor(private af2: AngularFirestore,
    public uiService: UIService,
    private gameAuth: AuthService) {
      this.initializeGame();
  }

  initializeGame(): void {
    this.playerUID = this.gameAuth.getUID();
    this.addNewPlayer('Me', this.playerUID);
    console.log('initializeGame(): ' + this.playerUID);
    this.resetGame();
  }

  resetGame(): void {
    this.setCurrentHole(1);
    this.initializeScores();
    this.currentTeam = 1;
    this.setCurrentPlayerNumber(0);
    this.currentCourse = new Course('Default');
    this.setDirtyScoreCard(false);
    this.gameID = '';
  }

  resetPlayers(): void {
    this.players = [];
    this.currentPlayerNumber = 0;
    this.currentScore = 0;
    this.currentTotScore = 0;
  }

  initializeScores(): void {
    if (this.players.length > 0) {
      this.players.forEach(player => {
        player.resetScores();
      });
      this.currentScore = this.getCurrentScore();
      this.currentTotScore = this.getCurrentTotScore();
      this.setCurrentHole(1);
      this.scoreToDisplayChanged.next(this.getCurrentScore());
    }
  }

  loadSavedGame(gameToLoad) {
     console.log(gameToLoad);
     this.resetGame();
     this.resetPlayers();
     this.gameID = gameToLoad.data.gameID;
     gameToLoad.data.gamePlayers.forEach(player => {
      this.addNewPlayer(player.playerName, player.playerUID);
      this.getCurrentPlayer().score = player.playerScores;
     });
     this.scoreToDisplayChanged.next(this.getCurrentScore());
  }

  setScoreCardDirty(dirtyFlag) {
    this.isScoreCardDirty = dirtyFlag;
  }

  getScoreCardDirty(): boolean {
    return this.isScoreCardDirty;
  }

  getGameID() {
    return this.gameID;
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

  addNewPlayer(name: string, playerUID: string) {
    this.setCurrentPlayerNumber(this.players.length);
    this.players[this.getCurrentPlayerNbr()] = new Player(name, playerUID);
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
        userID: this.gameAuth.getUID(),
        outingID: 'test outing',
        createDate: new Date(),
        gamePlayers: this.getScoreInfo(this.gameAuth.getUID()),
        gameID: '' })
      .then(docRef => {
        this.gameID = docRef.id;
        console.log('addNewGameIDToDatabase():this.gameID: ' + this.gameID);
        const userRef: AngularFirestoreDocument<any> = this.af2.doc(`game/${this.gameID}`);
        userRef.update({gameID: this.gameID});
      })
      .catch(error => {
        console.log('gamesCollection.add: error' + error );
        this.uiService.showSnackbar(error.message, null, 5000);
      });
  }

  updatePlayerScoresOnGame(newGameID) {
    const gameDocRef = this.af2.collection<Game>('game').doc(newGameID);
    gameDocRef.update({
      gamePlayers: this.getScoreInfo(this.gameAuth.getUID()),
      gameID: newGameID})
    .then(() => {
      this.uiService.showSnackbar('Game Updated', null, 5000);
    })
    .catch(error => {
      console.log('Error updating player scores on Game: ' + error );
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

  getScoreInfo(UID: string): Scores[] {
    const scoreArray: Scores[] = [];
    this.getPlayers().forEach( (player) => {
      scoreArray.push( {
        playerName: player.name,
        playerScores: player.getPlayerScores(),
        playerUID: UID
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
