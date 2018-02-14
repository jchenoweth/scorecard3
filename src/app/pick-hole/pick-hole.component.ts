import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../shared/game.service';


@Component({
  selector: 'app-pick-hole',
  templateUrl: './pick-hole.component.html',
  styleUrls: ['./pick-hole.component.css']
})
export class PickHoleComponent {
  @Input() currentHole = 1;
  @Output() holeChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(public router: Router) { }

  getCurrentHole(): number {
    return this.currentHole;
  }

  incrementHole() {
    if (this.currentHole < 18) {
      this.currentHole++;
    } else {
      this.currentHole = 1;
    }
    this.holeChanged.emit(this.currentHole);
  }

  decrementHole() {
    if (this.currentHole > 1) {
      this.currentHole--;
    } else {
      this.currentHole = 18;
    }
    this.holeChanged.emit(this.currentHole);
  }
}
