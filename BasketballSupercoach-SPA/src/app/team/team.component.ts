import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  playerSelected(position: number) {
    console.log('position selected is ' + position);

    // if (position > 5) {
      // get all players
      this.router.navigate(['selectplayer/']);
    // } else {
      // get specific position players
      // this.router.navigate(['selectplayer/']);
    // }
  }

}
