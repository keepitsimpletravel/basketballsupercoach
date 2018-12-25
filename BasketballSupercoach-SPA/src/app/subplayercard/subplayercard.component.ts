import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Playercard } from '../_models/playercard';

@Component({
  selector: 'app-subplayercard',
  templateUrl: './subplayercard.component.html',
  styleUrls: ['./subplayercard.component.css']
})
export class SubplayercardComponent implements OnInit {
  @Input() playercard: Playercard;
  @Output() subPlayer = new EventEmitter<number>();
  selected = 0;
  lastScore: number;
  averageScore: number;

  constructor() { }

  ngOnInit() {
    this.lastScore = this.playercard.lastScore / 100;
    this.averageScore = this.playercard.averageScore / 100;
  }

  movePlayers(pc: number) {
    this.subPlayer.emit(pc);
  }

}
