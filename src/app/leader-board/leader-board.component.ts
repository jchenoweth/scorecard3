import { Component, OnInit, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../shared/game.service';
import { Player } from '../shared/player.model';
import { GameScore } from '../shared/leaderboard.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject ,  Subject ,  Observable } from 'rxjs';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})

export class LeaderBoardComponent implements OnInit {
  displayedColumns = ['player', 'front', 'back', 'total'];
  leaderBoardDataSource: LeaderBoardDataSource | null;
  // dataSource: LeaderBoardDataSource | null;
  leaderBoardScores: BehaviorSubject<GameScore[]> = new BehaviorSubject<GameScore[]>([]);
  players: Player[];
  gameScores: GameScore[] = [];
  frontTotalScore = 0;
  backTotalScore = 0;
  totalBack9Score = 0;
  totalFront9Score = 0;
  totScore = 0;


  constructor( private gs: GameService,
    public router: Router,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.players = this.gs.getPlayers();

    for (const plr of this.players) {
      this.totScore = plr.score.reduce((total, num) => total + num);
      this.frontTotalScore = plr.getFront9Score();
      this.backTotalScore = plr.getBack9Score();

      const score: GameScore = new GameScore(
        plr.name,
        this.totScore,
        this.frontTotalScore,
        this.backTotalScore);

      this.gameScores.push(score);

      this.backTotalScore = 0;
      this.frontTotalScore = 0;
      this.totScore = 0;
    }

    this.gameScores.sort((a: any, b: any) => {
      return parseInt(a.playerTotalScore, 10) - parseInt(b.playerTotalScore, 10);
    });

    this.leaderBoardScores.next(this.gameScores);
    this.leaderBoardDataSource = new LeaderBoardDataSource(this.leaderBoardScores);
    setTimeout(() => this.cd.markForCheck());
  }

  goBack() {
    this.router.navigate(['']);
  }


}

export class LeaderBoardDataSource extends DataSource<any> {
  constructor(private _leaderBoard: BehaviorSubject<GameScore[]>) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): BehaviorSubject<GameScore[]> {
    return this._leaderBoard;
  }

  disconnect() {}
}
