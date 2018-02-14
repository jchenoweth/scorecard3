import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from './../shared/game.service';
import { Player } from './../shared/player.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// The this component should maintain the current hole, player, score
// and pass that info to the corresponding service when needed

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit, OnDestroy {
  currentHoleNotification: BehaviorSubject<number>;
  currentHole: number;
  currentScoreNotification: BehaviorSubject<number>;
  currentScore: number;
  currentTotScore: number;
  currentPlayerNumberNotification: BehaviorSubject<number>;
  currentPlayerNumber = 0;
  currentPlayer: Player;
  holeSubscription: Subscription;
  scoreSubscription: Subscription;
  playerNbrSubscription: Subscription;

  constructor(private gs: GameService) { }

  ngOnInit() {
    // this.currentHoleNotification = this.gs.getHoleChangedNotification();
    this.holeSubscription = this.gs.getHoleChangedNotification()
      .subscribe((hole) => {
        this.updateLocalHole(hole);
      });

    // this.currentPlayerNumberNotification = this.gs.getPlayerChangedNotification();
    this.playerNbrSubscription = this.gs.getPlayerChangedNotification()
      .subscribe((playerNbr) => {
        this.currentPlayerNumber = playerNbr;
        this.updatePlayerFields(this.currentPlayerNumber);
      });

    // this.currentScoreNotification = this.gs.getScoreChangedNotification();
    this.scoreSubscription = this.gs.getScoreChangedNotification()
      .subscribe((score) => {
        this.updateScoreFields(score);
      });

    this.updatePlayerFields(this.gs.getCurrentPlayerNbr());
    this.updateScoreFields(this.gs.getCurrentScore());
    this.updateLocalHole(this.gs.getCurrentHole());
  }

  updatePlayerFields(playerNumber: number) {
    this.currentPlayerNumber = playerNumber ;
    this.currentPlayer = this.gs.getCurrentPlayer();
    this.currentTotScore = this.gs.getCurrentTotScore();
    console.log('score-card: updatePlayerFields: current player name: ' +
      this.currentPlayer.name );
    console.log('score-card: updatePlayerFields: current player number: ' +
      this.currentPlayerNumber );
    console.log('score-card: updatePlayerFields: current total score: ' +
     this.currentTotScore );
  }

  nextPlayer() {
    console.log('score-card.nextPlayer()')
    this.gs.nextPlayer();
  }

  prevPlayer() {
    console.log('score-card.prevPlayer()');
    this.gs.prevPlayer();
  }

  updateScoreFields(score: number) {
    this.currentScore = score;
    this.currentTotScore = this.gs.getCurrentTotScore();
  }

  incrementScore(): void {
    this.gs.incrementScore();
  }

  decrementScore(): void {
    this.gs.decrementScore();
  }

  updateLocalHole(hole: number) {
    this.currentHole = hole;
    this.currentTotScore = this.gs.getCurrentTotScore();
  }

  updateCurrentHole(hole: number) {
    this.gs.updateHole(hole);
  }

  ngOnDestroy() {
    this.holeSubscription.unsubscribe();
    this.playerNbrSubscription.unsubscribe();
    this.scoreSubscription.unsubscribe();
  }
}
