import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { TeamsalaryService } from '../_services/teamsalary.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { TeamdetailService } from '../_services/teamdetail.service';
import { Player } from '../_models/player';
import { TeamDetail } from '../_models/teamdetail';
import { Playercard } from '../_models/playercard';
import { PlayersService } from '../_services/players.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  availableSalary: number;
  user: User;
  // players: Player[];
  // teamDetails: TeamDetail[];
  playerCards: Playercard[] = [];
  // teamLoaded: Promise<boolean>;
  loaded: number;
  captainSelected = 0;
  updates = 0;
  // playerAdded: number;
  // Observable<Array<any>>
  // playerCards: Observable<Array<any>>;


  constructor(public router: Router, private alertify: AlertifyService,
     private userService: UserService, private teamSalaryService: TeamsalaryService,
     private authService: AuthService, private teamDetailService: TeamdetailService, private playerService: PlayersService) { }

  ngOnInit() {
    this.loaded = 0;
    // this.playerAdded = 0;

    // Need to get the current user
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      this.user = user;

      this.teamSalaryService.getTeamSalary(this.user.id).subscribe(next => {
        this.availableSalary = next.availableSalary;
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });

    this.teamDetailService.GetPlayerCardsForUser(this.authService.decodedToken.nameid).subscribe(data => {
      this.playerCards = data;
      for (let p = 0; p < this.playerCards.length; p ++) {
        this.playerCards[p].averageScore = this.playerCards[p].averageScore / 100;
      }
    }, error => {
      this.alertify.error(error);
    }, () => {
      // update the loaded
      this.loaded = 1;
    });
  }

  playerSelected(position: number) {
    console.log('position selected is ' + position);
    localStorage.setItem('currentSelectPosition', position.toString());

    // How does this value get passed correctly
    this.router.navigate(['selectplayer/', position]);
  }

  setCaptainValues(captain: number) {
    this.updates = 1;
    if (captain !== 0) {
      // Then the captain has been changed
      for (let i = 0; i < this.playerCards.length; i ++) {
        this.playerCards[i].isCaptain = captain;
      }
    }
  }

  setSixthManValues(sixth: number) {
    this.updates = 1;
    if (sixth !== 0) {
      // Then the captain has been changed
      for (let i = 0; i < this.playerCards.length; i ++) {
        this.playerCards[i].isSixthMan = sixth;
      }
    }
  }

  setEmergencyValues(emergency: number) {
    this.updates = 1;
    if (emergency !== 0) {
      // Then the captain has been changed
      for (let i = 0; i < this.playerCards.length; i ++) {
        this.playerCards[i].isEmergency = emergency;
      }
    }
  }

  saveTeam() {
    for (let p = 0; p < this.playerCards.length; p ++) {
      this.teamDetailService.updateTeamDetailRecord(this.playerCards[p]).subscribe(data => {
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.alertify.success('Team Saved Successfully');
      });
    }
  }
}
