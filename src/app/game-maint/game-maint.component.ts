import { Component } from '@angular/core';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-game-maint',
  templateUrl: './game-maint.component.html',
  styleUrls: ['./game-maint.component.css']
})
export class GameMaintComponent {

  constructor(private gs: GameService) { }

  onResetScores() {
    this.gs.initializeScores();
  }

  onNewGame() {
    this.gs.initializeScores();
    this.gs.resetGameID();
  }

}
