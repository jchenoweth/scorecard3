

import { Player } from './../shared/player.model';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-score',
  templateUrl: './total-score.component.html',
  styleUrls: ['./total-score.component.css']
})
export class TotalScoreComponent implements OnInit {
  @Input() totScore: number;

  constructor() { }

  ngOnInit() {
  }
}
