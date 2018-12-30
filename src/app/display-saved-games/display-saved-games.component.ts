import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-display-saved-games',
  templateUrl: './display-saved-games.component.html',
  styleUrls: ['./display-saved-games.component.css']
})
export class DisplaySavedGamesComponent implements OnInit {

  constructor(private af: AngularFirestore) {
  }

  ngOnInit() {
    this.af
      .collection('game')
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      });
  }
}
