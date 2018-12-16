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

  constructor() { }

  ngOnInit() {
  }

  movePlayers(pc: number) {
    this.subPlayer.emit(pc);
  }

}
