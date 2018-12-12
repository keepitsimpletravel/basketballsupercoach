import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Playercard } from '../_models/playercard';

@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.css']
})
export class TeamcardComponent implements OnInit {
  @Input() playercard: Playercard;
  @Output() captainSet = new EventEmitter<number>();
  currentPosition: number;

  constructor() { }

  setCaptain(position: number) {
    console.log('captain set - ' + position);

    if (this.playercard.isCaptain === 1) {
      // already set as captain so swith off
      this.playercard.isCaptain = 0;
      this.currentPosition = 0;
      this.captainSet.emit(0);
    } else {
      // this is a new captain
      this.playercard.isCaptain = 1;
      this.currentPosition = this.playercard.cardPosition;
      this.captainSet.emit(this.playercard.cardPosition);
    }
  }

  ngOnInit() {
  }

}
