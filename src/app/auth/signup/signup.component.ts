import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { GameService } from '../../shared/game.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  // maxDate;
  shortName = '';
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService,
              private gs: GameService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged
      .subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    // this.maxDate = new Date();
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
      shortName: form.value.shortName,
      userId: ''
    });
    this.gs.saveScoreCard();
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
  openTCDialogue() {}
}
