import { Course } from './../shared/course.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService} from '../shared/game.service';

@Component({
  selector: 'app-hole-desc',
  templateUrl: './hole-desc.component.html',
  styleUrls: ['./hole-desc.component.css']
})

export class HoleDescComponent implements OnInit {
  currentHoleDesc: string;
  currentHole: number;

  constructor(
    public gs: GameService,
    public router: Router) {
  }

  ngOnInit() {

  }

  getCurrentHole(): number {
    return this.gs.getCurrentHole() ;
  }

  getCurrentHoleDesc(): string {
    const currentCourse: Course = this.gs.getCurrentCourse();
    const currentHole = this.gs.getCurrentHole() - 1;
    return currentCourse.getHoleDescription(currentHole);
  }

}
