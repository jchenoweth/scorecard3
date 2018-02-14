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
  @Output() onPrevPlayer: EventEmitter<string> = new EventEmitter<string>();
  @Output() onNextPlayer: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public gs: GameService,
    public router: Router) { }

  ngOnInit() {
  }

  playerClicked() {
    this.router.navigate(['playermaint']);
  }

  prevPlayer() {
    console.log('pick-player.prevPlayer()');
    this.onPrevPlayer.emit('prev');
  }

  nextPlayer() {
    console.log('pick-player.nextPlayer()');
    this.onNextPlayer.emit('next');
  }

  goBack() {
    this.router.navigate(['']);
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }
}
