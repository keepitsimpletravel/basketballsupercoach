import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { TeamsalaryService } from '../_services/teamsalary.service';
import { TeamSalary } from '../_models/teamsalary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  model: any = {};

  constructor(private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute, private alertify: AlertifyService, private teamSalaryService: TeamsalaryService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      if (this.user.salarySet === 0) {

        this.model.userId = this.user.id;
        this.model.availableSalary = 150000000;
        console.log('model for Team Salary set');

        // need to create the TeamSalary object
        this.teamSalaryService.createTeamSalary(this.model).subscribe(next => {
          // Need to set the salary set to be 1
          console.log('salary created successfully');
          this.userService.updateSalarySet(this.user).subscribe(udt => {
            console.log('Salary Set to 1');
          }, error => {
            this.alertify.error(error);
          });
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }

  loadUser() {
    console.log('in load user');
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      // appears to return value but is not defined
      this.user = user;

      console.log(user);
      console.log(this.user.teamSelected);
    }, error => {
      this.alertify.error(error);
    });
  }

  teamSelected() {
    if (this.user.teamSelected === 0) {
      return false;
    } else {
      return true;
    }
  }

}
