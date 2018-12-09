import { Component, OnInit, Input } from '@angular/core';
import { Playercard } from '../_models/playercard';

@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.css']
})
export class TeamcardComponent implements OnInit {
  @Input() playercard: Playercard;
  
  constructor() { }

  ngOnInit() {
  }

}
