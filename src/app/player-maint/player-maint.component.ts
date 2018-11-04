import { Subscription ,  BehaviorSubject } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GameService} from '../shared/game.service';
import {Player} from '../shared/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-maint',
  templateUrl: './player-maint.component.html',
  styleUrls: ['./player-maint.component.css']
})

export class PlayerMaintComponent implements OnInit {
  currentPlayerNumberNotification: BehaviorSubject<number>;
  playerNbrSubscription: Subscription;
  players: Player[];
  editMode = false;
  rowClicked: number;
  @ViewChild('playerInput') playerInputElement: ElementRef;

  constructor(
    public gs: GameService,
    public router: Router) {
  }

  ngOnInit() {
    this.players = this.gs.getPlayers();
    // this.playerInputElement.nativeElement.focus();

    this.playerNbrSubscription = this.gs.getPlayerChangedNotification()
    .subscribe((playerNbr) => {
      this.players = this.gs.getPlayers();
    });
  }

  onInputClicked() {
    this.playerInputElement.nativeElement.focus();
  }

  onPlayerClicked(
    playerInput: HTMLInputElement,
    plr: Player,
    playerIndex: number) {
    playerInput.value = plr.name;
    this.editMode = true;
    this.rowClicked = playerIndex;
    playerInput.focus();
  }

  onAdd(player: string, playerInput: HTMLInputElement) {
    if (player.length > 0) {
      const newPlayer = player.substring(0, 5);
      this.gs.addNewPlayer(newPlayer);
      playerInput.value = '';
      this.editMode = false;
      playerInput.focus();
    }
  }

  onUpdate(playerName: string, playerInput: HTMLInputElement) {
    if (playerName.length > 0) {
      const updatedPlayerName = playerName;
      console.log('player-maint:onUpdate: rowClicked:' + this.rowClicked);
      this.gs.updatePlayerName(updatedPlayerName, this.rowClicked);
      playerInput.value = '';
      this.editMode = false;
      playerInput.focus();
    }
  }

  onDelete(playerInput: HTMLInputElement) {
    if (this.players.length > 0) {
      this.gs.deletePlayer(this.rowClicked);

      playerInput.value = '';
      this.editMode = false;
    }
    playerInput.focus();
  }

  onCancel(playerInput: HTMLInputElement) {
    playerInput.value = '';
    this.editMode = false;
    playerInput.focus();
  }

  goBack() {
    this.router.navigate(['']);
  }
}
