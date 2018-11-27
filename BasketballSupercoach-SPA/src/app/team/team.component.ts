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

    // How does this value get passed correctly
    this.router.navigate(['selectplayer/' + position]);
  }

}
