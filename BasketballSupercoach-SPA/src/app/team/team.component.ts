import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { TeamsalaryService } from '../_services/teamsalary.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  availableSalary: number;
  user: User;
  // tslint:disable-next-line:max-line-length
  constructor(public router: Router, private alertify: AlertifyService, private userService: UserService, private teamSalaryService: TeamsalaryService, private authService: AuthService) { }

  ngOnInit() {
    // Need to get the current user
    console.log('userId - ' + this.authService.decodedToken.nameid);
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      this.user = user;
      console.log(user);

      // this.createTeamSalary();
      this.teamSalaryService.getTeamSalary(this.user.id).subscribe(next => {
        console.log('got team salary value - ' + next.availableSalary);
        this.availableSalary = next.availableSalary;
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  playerSelected(position: number) {
    console.log('position selected is ' + position);
    localStorage.setItem('currentSelectPosition', position.toString());

    // How does this value get passed correctly
    this.router.navigate(['selectplayer/', position]);
  }

  // createTeamSalary() {
  //   // Need to get the users id and pass in
  //   this.teamSalaryService.createTeamSalary(this.authService.decodedToken.nameid).subscribe(() => {
  //     this.alertify.success('teams salary created');
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
