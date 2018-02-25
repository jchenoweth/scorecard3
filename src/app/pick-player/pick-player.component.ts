import { Player } from './../shared/player.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-player',
  templateUrl: './pick-player.component.html',
  styleUrls: ['./pick-player.component.css']
})
export class PickPlayerComponent implements OnInit {
  @Input() currentPlayer: Player;
  @Output() prevPlayer: EventEmitter<string> = new EventEmitter<string>();
  @Output() nextPlayer: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public gs: GameService,
    public router: Router) { }

  ngOnInit() {
  }

  playerClicked() {
    this.router.navigate(['playermaint']);
  }

  onPrevPlayer() {
    this.prevPlayer.emit('prev');
  }

  onNextPlayer() {
    console.log('pick-player onNextPlayer() called');
    this.nextPlayer.emit('next');
  }

  goBack() {
    this.router.navigate(['']);
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }
}
