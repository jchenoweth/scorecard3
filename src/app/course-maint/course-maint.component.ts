import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { CourseService } from './../shared/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course.model';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-course-maint',
  templateUrl: './course-maint.component.html',
  styleUrls: ['./course-maint.component.css']
})
export class CourseMaintComponent implements OnInit {
  courseForm: FormGroup;
  courseName = 'This Course';
  nbrOfHoles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  holePar: number[];

  constructor(public authServ: AuthService) { }

  ngOnInit() {
    this.courseForm = new FormGroup ({
      'courseName': new FormControl(null),
      'parForHole1': new FormControl(),
      'parForHole2': new FormControl(),
      'parForHole3': new FormControl(),
      'parForHole4': new FormControl(),
      'parForHole5': new FormControl(),
      'parForHole6': new FormControl(),
      'parForHole7': new FormControl(),
      'parForHole8': new FormControl(),
      'parForHole9': new FormControl(),
      'parForHole10': new FormControl(),
      'parForHole11': new FormControl(),
      'parForHole12': new FormControl(),
      'parForHole13': new FormControl(),
      'parForHole14': new FormControl(),
      'parForHole15': new FormControl(),
      'parForHole16': new FormControl(),
      'parForHole17': new FormControl(),
      'parForHole18': new FormControl()
    });
  }

  onSubmit() {
    console.log(this.courseForm);
  }

  onParClicked() {
  }

  clearForm() {
    this.courseForm.reset();
  }
}
