import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Playercard } from '../_models/playercard';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.css']
})
export class TeamcardComponent implements OnInit {
  @Input() playercard: Playercard;
  @Output() captainSet = new EventEmitter<number>();
  @Output() sixthManSet = new EventEmitter<number>();
  @Output() emergencySet = new EventEmitter<number>();
  lastScore: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  setCaptain(position: number) {
    if (this.playercard.isCaptain === position) {
      // already set as captain so swith off
      this.playercard.isCaptain = 0;
      this.captainSet.emit(0);
    } else {
      // this is a new captain
      this.playercard.isCaptain = 1;
      this.captainSet.emit(this.playercard.cardPosition);
    }
  }

  setSixthMan(position: number) {
    console.log('sixthman set - ' + position);

    if (this.playercard.isSixthMan === position) {
      // already set as sixth man so swith off
      this.playercard.isSixthMan = 0;
      this.sixthManSet.emit(0);
    } else {
      // this is a new captain
      this.playercard.isSixthMan = 1;
      this.sixthManSet.emit(this.playercard.cardPosition);
    }
  }

  setEmergency(position: number) {
    console.log('emergency set - ' + position);

    if (this.playercard.isEmergency === position) {
      // already set as sixth man so swith off
      this.playercard.isEmergency = 0;
      this.sixthManSet.emit(0);
    } else {
      // this is a new captain
      this.playercard.isEmergency = 1;
      this.emergencySet.emit(this.playercard.cardPosition);
    }
  }

  tradePlayer(pc: Playercard) {
    this.router.navigate(['/tradeplayer/', JSON.stringify(pc)]);
  }

  subPlayer(pc: Playercard) {
    console.log('Sub button pressed for ' + pc.cardPositionText);
    this.router.navigate(['/subplayer/', JSON.stringify(pc)]);
  }

  ngOnInit() {
    this.lastScore = this.playercard.lastScore / 100;
  }

}
