import { Component, OnInit, Input } from '@angular/core';
import { Playercard } from '../_models/playercard';

@Component({
  selector: 'app-dashboardcard',
  templateUrl: './dashboardcard.component.html',
  styleUrls: ['./dashboardcard.component.css']
})
export class DashboardcardComponent implements OnInit {
  @Input() playercard: Playercard;
  lastScore: number;

  constructor() { }

  ngOnInit() {
    console.log('inside playercard - ' + this.playercard.cardPositionText);
    console.log('inside playercard - ' + this.playercard.team);
    console.log('inside playercard - ' + this.playercard.playerId);

    this.lastScore = this.playercard.lastScore / 100;
  }

}
