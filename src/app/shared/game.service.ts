import { Course } from './course.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Team } from './team.model';
import { Injectable } from '@angular/core';
import { Player } from '../shared/player.model';

@Injectable()
export class GameService {
  private scoreChanged = new BehaviorSubject<number>(0);
  private holeChanged = new BehaviorSubject<number>(1);
  private playerChanged = new BehaviorSubject<number>(0);
  private teams: Team[] = [];
  private currentTeam: number;
  private currentHole: number;
  private currentPlayerNumber: number;
  private currentScore: number;
  private currentPlayer: Player;
  private currentTotScore: number;
  private players: Player[] = [];
  private currentCourse: Course;

  constructor() {
    this.initializeGame();
  }

  initializeGame(): void {
    this.addNewPlayer('Me');
    this.setCurrentHole(1);
    this.initializeScores();
    this.currentTeam = 1;
    this.setCurrentPlayerNumber(0);
    this.currentCourse = new Course('Default');
  }

  initializeScores(): void {
    this.players.forEach(player => {
      player.resetScores();
    });
    this.currentScore = this.getCurrentScore();
    this.currentTotScore = this.getCurrentTotScore();
    this.scoreChanged.next(this.getCurrentScore());
  }

  getCurrentCourse() {
    return this.currentCourse;
  }

  getScoreChangedNotification(): BehaviorSubject<number> {
    return this.scoreChanged;
  }

  getHoleChangedNotification(): BehaviorSubject<number> {
    return this.holeChanged;
  }

  getPlayerChangedNotification(): BehaviorSubject<number> {
    return this.playerChanged;
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
    this.holeChanged.next(hole);
    this.scoreChanged.next(this.getCurrentScore());
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
    this.playerChanged.next(this.getCurrentPlayerNbr());
  }

  deletePlayer(playerNbr: number) {
    this.players.splice(playerNbr, 1);

    if (this.players.length === 0 ) {
      this.initializeGame();
    } else {
      this.setCurrentPlayerNumber(0);
    }

    this.scoreChanged.next(this.getCurrentScore());
    this.playerChanged.next(this.getCurrentPlayerNbr());
    }

  addNewPlayer(name: string) {
    this.setCurrentPlayerNumber(this.players.length);
    this.players[this.getCurrentPlayerNbr()] = new Player(name);
    this.setCurrentPlayer(this.players[this.getCurrentPlayerNbr()]);
    this.playerChanged.next(this.getCurrentPlayerNbr());
    this.scoreChanged.next(this.getCurrentScore());
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
    this.playerChanged.next(this.getCurrentPlayerNbr());
    this.scoreChanged.next(this.getCurrentScore());
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
    console.log('player number: ' + this.currentPlayerNumber);
    this.playerChanged.next(this.getCurrentPlayerNbr());
    this.scoreChanged.next(this.getCurrentScore());
  }

  incrementScore() {
    this.currentScore = this.getCurrentPlayer()
      .incrementScore(this.getCurrentHole());
    this.currentTotScore = this.getCurrentPlayer()
      .getPlayerTotalScore();
    this.scoreChanged.next(this.getCurrentScore());
  }

  decrementScore() {
    this.currentScore = this.getCurrentPlayer()
      .decrementScore(this.getCurrentHole());
    this.currentTotScore = this.getCurrentPlayer()
      .getPlayerTotalScore();
    this.scoreChanged.next(this.getCurrentScore());
  }
}
