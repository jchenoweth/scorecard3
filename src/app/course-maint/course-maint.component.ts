
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
  holePars: number[];
  constructor() { }

  ngOnInit() {
    this.holePars = [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ];
  }

  onParClicked() {

  }
}
