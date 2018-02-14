
import { Player } from './../shared/player.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameService} from '../shared/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-score',
  templateUrl: './enter-score.component.html',
  styleUrls: ['./enter-score.component.css']
})
export class EnterScoreComponent implements OnInit {
  @Input() currentPlayer: Player;
  @Input() currentHole: number;
  @Input() currentScore: number;
  @Output() incScore: EventEmitter<any> = new EventEmitter<any>();
  @Output() decScore: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public gs: GameService,
    private router: Router) { }

  ngOnInit() {

  }

  scoreClicked() {
    this.router.navigate(['leaderboard']);
  }

  incrementScore(): void {
    this.incScore.emit();
  }

  decrementScore(): void {
    this.decScore.emit();
  }
}
