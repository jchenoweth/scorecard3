import { Game } from './../shared/game.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { ngForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GameService } from '../shared/game.service';


@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css']
})
export class SavedGamesComponent implements OnInit {
  games: Observable<any[]>;
  constructor(
    private af: AngularFirestore,
    public gs: GameService) {
  }

  ngOnInit() {
    this.games = this.af
      .collection('game')
      .snapshotChanges()
      .pipe(map(documentArray => {
        return documentArray.map(doc => {
          return {
            outingID: doc.payload.doc.id,
            data: doc.payload.doc.data()
          };
        });
      }));
  }

  loadSavedGame(game) {
    this.gs.loadSavedGame(game);
  }

  
}
