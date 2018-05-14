import { AuthService } from './../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { GameService } from './../shared/game.service';
import { Player } from './../shared/player.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

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
  scoreCardChangedSub: Subscription;
  currentPlayerNumber = 0;
  currentPlayer: Player;



  constructor(public gs: GameService, public auth: AuthService) { }

  ngOnInit() {
    this.scoreCardChangedSub = this.gs.getScoreCardChangedNotification()
      .subscribe((scorecardChangeNotification) => {
        this.setScoreCardDirty(scorecardChangeNotification);
      });

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
    console.log('score-card.nextPlayer() called');
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
    this.gs.setScoreCardDirty(false);
    this.gs.saveScoreCard();
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
    if (this.scoreCardChangedSub) {
      this.scoreCardChangedSub.unsubscribe();
    }
  }

  setScoreCardDirty(dirty: boolean) {
    this.gs.setScoreCardDirty(dirty);
    console.log('scoreCardDirty?: ' + this.gs.getScoreCardDirty());
  }
}
