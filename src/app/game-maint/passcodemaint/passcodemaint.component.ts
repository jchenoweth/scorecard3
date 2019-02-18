import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { GameService } from '../../shared/game.service';

@Component({
  selector: 'app-passcodemaint',
  templateUrl: './passcodemaint.component.html',
  styleUrls: ['./passcodemaint.component.css']
})
export class PasscodemaintComponent implements OnInit {
  passcode = '';

  constructor(private afs: AngularFirestore,
              private gs: GameService ) { }

  ngOnInit() {
    console.log('GameID: ', this.gs.getGameID());
    if (this.gs.getGameID() === '') {
      this.gs.addNewGameIDToDatabase();
    }
    console.log('GameID: ', this.gs.getGameID());
  }

  onPasscodeSave() {
    // console.log('passcode Save clicked', this.passcode);

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`game/${this.gs.getGameID()}`);
        userRef.update({passcode: this.passcode})
    .then (function() {
      console.log('Passcode saved successfully');
    })
    .catch(function(error) {
      console.log('Error saving passcode', error);
    });
  }

}
