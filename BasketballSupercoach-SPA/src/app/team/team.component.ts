import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { TeamsalaryService } from '../_services/teamsalary.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(public router: Router, private alertify: AlertifyService, private teamSalaryService: TeamsalaryService, private authService: AuthService) { }

  ngOnInit() {
    // this.createTeamSalary();
  }

  playerSelected(position: number) {
    console.log('position selected is ' + position);
    localStorage.setItem('currentSelectPosition', position.toString());

    // How does this value get passed correctly
    this.router.navigate(['selectplayer/', position]);
  }

  createTeamSalary() {
    // Need to get the users id and pass in
    this.teamSalaryService.createTeamSalary(this.authService.decodedToken.nameid).subscribe(() => {
      this.alertify.success('teams salary created');
    }, error => {
      this.alertify.error(error);
    });
  }

}
