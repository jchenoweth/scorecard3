import { GameService } from './../../shared/game.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
// import { userInfo } from 'os';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;
  scoreCardID: string;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private uiService: UIService,
    private gs: GameService) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged
      .subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value.email);
    // console.log(this.loginForm.value.password);

    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    // console.log('before saveScoreCard ');
    // this.gs.saveScoreCard();
    // console.log('after saveScoreCard ');
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
