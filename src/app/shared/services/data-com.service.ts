import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataComService {

  public passedItemData = new BehaviorSubject<any>('');
  getPassedItemData = this.passedItemData.asObservable();

  constructor() { }

  setPassedItemData(data) {
    this.passedItemData.next(data);
  }
}
 