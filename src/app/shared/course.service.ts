import { Course } from './course.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CourseService {
  private currentCourse: Course;

  constructor() { }

  addNewCourse(course: Course) {
    this.currentCourse = course;
  };

  getCourse(): Course {
    return this.currentCourse;
  };

  getCurrentHoleDescription(hole: number) {
    return this.currentCourse.holeDescription[ hole - 1 ];
  }
}
