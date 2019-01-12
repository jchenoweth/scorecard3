import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-game-maint',
  templateUrl: './game-maint.component.html',
  styleUrls: ['./game-maint.component.css']
})
export class GameMaintComponent {

  constructor(
    private gs: GameService,
    private router: Router,
    public authServ: AuthService,
    private uiService: UIService) { }

  onResetScores() {
    this.gs.initializeScores();
    this.router.navigate(['/scorecard']);
    this.uiService.showSnackbar('Scores Reset', null, 5000);
  }

  onNewGame() {
    this.gs.initializeScores();
    this.gs.resetGameID();
    this.router.navigate(['/scorecard']);
    this.uiService.showSnackbar('New Game Created', null, 5000);
  }

  onLoadSaveGames() {
    this.router.navigate(['/savedgames']);
  }
}
