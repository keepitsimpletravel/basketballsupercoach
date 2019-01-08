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
    this.route.data.subscribe(data => {
      this.user = data['user'];
      if (this.user.salarySet === 0) {

        this.model.userId = this.user.id;
        this.model.availableSalary = 150000000;
        this.availableSalary = this.model.availableSalary;

        // need to create the TeamSalary object
        this.teamSalaryService.createTeamSalary(this.model).subscribe(next => {
          // Need to set the salary set to be 1
          this.userService.updateSalarySet(this.user).subscribe(udt => {
          }, error => {
            this.alertify.error('Error has occurred in Creating team Salary');
          });
        }, error => {
          this.alertify.error(error);
        });
      } else {
        // Need to get the salary for the team
        this.teamSalaryService.getTeamSalary(this.user.id).subscribe(next => {
          this.availableSalary = next.availableSalary;
        }, error => {
          this.alertify.error('Error has occurred in Getting the Team Salary');
        });
      }
    });

    this.teamDetailService.GetPlayerCardsForUser(this.authService.decodedToken.nameid).subscribe(data => {
      this.playerCards = data;
      for (let p = 0; p < this.playerCards.length; p ++) {
        this.playerCards[p].averageScore = this.playerCards[p].averageScore / 100;
      }
    }, error => {
      this.alertify.error('error has occurred getting Players for Team');
    }, () => {
      // update the loaded
      this.loaded = 1;
    });

    this.teamDetailService.getRoundrank(this.authService.decodedToken.nameid).subscribe(data => {
      this.roundRank = data;
    }, error => {
      this.alertify.error('error has occurred for getting the round rank');
    });

    // Falling over here!
    this.teamDetailService.getRoundScore(this.authService.decodedToken.nameid).subscribe(data => {
      this.roundScore = data / 100;
    }, error => {
      this.alertify.error('error has occurred getting the round score');
    });

    this.teamDetailService.getTotalRank(this.authService.decodedToken.nameid).subscribe(data => {
      this.totalRank = data;
    }, error => {
      this.alertify.error('error has occurred getting the total rank');
    });

    this.teamDetailService.getTotalScore(this.authService.decodedToken.nameid).subscribe(data => {
      this.totalScore = data;
    }, error => {
      this.alertify.error('error has occurred getting the total score');
    });

    this.teamDetailService.getCurrentRound().subscribe(data => {
      this.round = data;
    }, error => {
      this.alertify.error('error has occurred getting the current round');
    });

    // Get compteitio status
    this.teamDetailService.getCompetitionStatus().subscribe(data => {
      this.currentState = data;
    }, error => {
      this.alertify.error('error has occurred getting the competition status');
    });
  }

  loadUser() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      // appears to return value but is not defined
      this.user = user;
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
