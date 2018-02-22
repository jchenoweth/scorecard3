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
  holeSubscription: Subscription;
  currentHole: number;
  currentScoreNotification: BehaviorSubject<number>;
  scoreSubscription: Subscription;
  currentScore: number;
  currentTotScore: number;
  currentPlayerNumberNotification: BehaviorSubject<number>;
  playerNbrSubscription: Subscription;
  currentPlayerNumber = 0;
  currentPlayer: Player;

  constructor(private gs: GameService) { }

  ngOnInit() {
    this.holeSubscription = this.gs.getHoleChangedNotification()
      .subscribe((hole) => {
        this.updateLocalHole(hole);
      });

    this.playerNbrSubscription = this.gs.getPlayerChangedNotification()
      .subscribe((playerNbr) => {
        this.currentPlayerNumber = playerNbr;
        this.updatePlayerFields(this.currentPlayerNumber);
      });

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
  }

  nextPlayer() {
    this.gs.nextPlayer();
  }

  prevPlayer() {
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

  onSave() {
    
  }

  ngOnDestroy() {
    if (this.holeSubscription) {
      this.holeSubscription.unsubscribe();
    }
    if (this.playerNbrSubscription) {
      this.playerNbrSubscription.unsubscribe();
    }
    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe();
    }
  }
}


