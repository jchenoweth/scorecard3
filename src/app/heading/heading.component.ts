import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
  @Input() headingTitle: string;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goBack() {
  this.router.navigate(['']);
  }
}
