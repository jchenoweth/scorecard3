
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from './shared/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import 'hammerjs';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScoreCardComponent } from './score-card/score-card.component';
import { PickPlayerComponent } from './pick-player/pick-player.component';
import { PickHoleComponent } from './pick-hole/pick-hole.component';
import { EnterScoreComponent } from './enter-score/enter-score.component';
import { PlayerMaintComponent } from './player-maint/player-maint.component';
import { CourseMaintComponent } from './course-maint/course-maint.component';
import { GameMaintComponent } from './game-maint/game-maint.component';
import { TotalScoreComponent } from './total-score/total-score.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { HoleDescComponent } from './hole-desc/hole-desc.component';
import { HeadingComponent } from './heading/heading.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SavedGamesComponent } from './saved-games/saved-games.component';

import { CourseService } from './shared/course.service';
import { UIService } from './shared/ui.service';
import { GameService } from './shared/game.service';
import { AuthService } from './auth/auth.service';
import { ScoreChangeNotificationService } from './shared/scorechangenotification.service';
import { TermsComponent } from './terms/terms.component';
import { DisplaySavedGamesComponent } from './display-saved-games/display-saved-games.component';

const routes: Routes = [
  { path: '', component: ScoreCardComponent, pathMatch: 'full' },
  { path: 'playermaint', component: PlayerMaintComponent},
  { path: 'scorecard', component: ScoreCardComponent},
  { path: 'coursemaint', component: CourseMaintComponent},
  { path: 'gamemaint', component: GameMaintComponent},
  { path: 'leaderboard', component: LeaderBoardComponent},
  { path: 'holedesc', component: HoleDescComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'savedgames', component: SavedGamesComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SavedGamesComponent,
    NotFoundComponent,
    ScoreCardComponent,
    PickPlayerComponent,
    PickHoleComponent,
    EnterScoreComponent,
    PlayerMaintComponent,
    CourseMaintComponent,
    GameMaintComponent,
    TotalScoreComponent,
    LeaderBoardComponent,
    HoleDescComponent,
    TopMenuComponent,
    HeadingComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    TermsComponent,
    DisplaySavedGamesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    GameService,
    UIService,
    ScoreChangeNotificationService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
