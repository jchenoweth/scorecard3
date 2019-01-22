
import { CourseService } from './../shared/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
  selector: 'app-course-maint',
  templateUrl: './course-maint.component.html',
  styleUrls: ['./course-maint.component.css']
})
export class CourseMaintComponent implements OnInit {
  courseName = 'This Course';
  nbrOfHoles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  holePar: number[];

  constructor() { }

  ngOnInit() {

  }

  onParClicked() {

  }
}
