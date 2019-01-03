import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { TeamsalaryService } from '../_services/teamsalary.service';
import { TeamSalary } from '../_models/teamsalary';
import { TeamdetailService } from '../_services/teamdetail.service';
import { Playercard } from '../_models/playercard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  model: any = {};
  availableSalary: number;

  playerCards: Playercard[] = [];
  loaded: number;

  roundScore: number;
  roundRank = 0;
  totalScore: number;
  totalRank = 0;
  round = 0;
  currentState = 0;

  constructor(private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute, private alertify: AlertifyService, private teamSalaryService: TeamsalaryService,
    private teamDetailService: TeamdetailService) { }

  ngOnInit() {
    console.log('dashboard #1');
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log('dashboard #2');
      if (this.user.salarySet === 0) {

        this.model.userId = this.user.id;
        this.model.availableSalary = 150000000;
        this.availableSalary = this.model.availableSalary;
        console.log('model for Team Salary set');

        console.log('dashboard #3');
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
      } else {
        // Need to get the salary for the team
        console.log('userId for getting salary = ' + this.user.id);
        this.teamSalaryService.getTeamSalary(this.user.id).subscribe(next => {
          console.log('got team salary value - ' + next.availableSalary);
          this.availableSalary = next.availableSalary;
        }, error => {
          this.alertify.error(error);
        });
      }
    });

    this.teamDetailService.GetPlayerCardsForUser(this.authService.decodedToken.nameid).subscribe(data => {
      console.log('data returned for player cards length: ' + data.length);
      this.playerCards = data;
      for (let p = 0; p < this.playerCards.length; p ++) {
        console.log(this.playerCards[p].playerId + ' - playerId for pos: ' + this.playerCards[p].cardPositionText);
        this.playerCards[p].averageScore = this.playerCards[p].averageScore / 100;
      }
    }, error => {
      this.alertify.error(error);
    }, () => {
      // update the loaded
      this.loaded = 1;
    });

    this.teamDetailService.getRoundrank(this.authService.decodedToken.nameid).subscribe(data => {
      this.roundRank = data;
      console.log('dashboard #4');
    }, error => {
      this.alertify.error(error);
    });

    // Falling over here!
    this.teamDetailService.getRoundScore(this.authService.decodedToken.nameid).subscribe(data => {
      this.roundScore = data / 100;
      console.log('dashboard #5');
    }, error => {
      this.alertify.error(error);
    });

    this.teamDetailService.getTotalRank(this.authService.decodedToken.nameid).subscribe(data => {
      this.totalRank = data;
      console.log('dashboard #6');
    }, error => {
      this.alertify.error(error);
    });

    this.teamDetailService.getTotalScore(this.authService.decodedToken.nameid).subscribe(data => {
      this.totalScore = data;
      console.log('dashboard #7');
    }, error => {
      this.alertify.error(error);
    });

    this.teamDetailService.getCurrentRound().subscribe(data => {
      this.round = data;
      console.log('dashboard #8');
    }, error => {
      this.alertify.error(error);
    });

    // Get compteitio status
    this.teamDetailService.getCompetitionStatus().subscribe(data => {
      this.currentState = data;
      console.log('dashboard #9');
    }, error => {
      this.alertify.error(error);
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
