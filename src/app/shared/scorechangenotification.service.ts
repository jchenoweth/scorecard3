import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ScoreChangeNotificationService {
  private scoreChangedNotification = new Subject<number>();

  constructor() { }
}
