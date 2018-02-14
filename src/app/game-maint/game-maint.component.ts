import { Component, OnInit } from '@angular/core';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-game-maint',
  templateUrl: './game-maint.component.html',
  styleUrls: ['./game-maint.component.css']
})
export class GameMaintComponent implements OnInit {

  constructor(private gs: GameService) { }

  ngOnInit () {
    this.gs.initializeGame();
  }

  resetScores() {
    this.gs.initializeScores();
  }

}
