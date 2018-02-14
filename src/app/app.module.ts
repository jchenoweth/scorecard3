import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { environment } from './shared/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';

import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CourseService } from './shared/course.service';
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

import { UIService } from './shared/ui.service';
import { GameService } from './shared/game.service';
import { AuthService } from './auth/auth.service';
import { ScorechangenotificationService } from './shared/scorechangenotification.service';

const routes: Routes = [
  { path: '', component: ScoreCardComponent, pathMatch: 'full' },
  { path: 'playermaint', component: PlayerMaintComponent},
  { path: 'scorecard', component: ScoreCardComponent},
  { path: 'coursemaint', component: CourseMaintComponent},
  { path: 'gamemaint', component: GameMaintComponent},
  { path: 'leaderboard', component: LeaderBoardComponent},
  { path: 'holedesc', component: HoleDescComponent},
  { path: 'signup', component: SignupComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    ScorechangenotificationService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
