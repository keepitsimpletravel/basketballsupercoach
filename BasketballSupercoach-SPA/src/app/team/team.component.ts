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
      console.log('data returned for player cards length: ' + data.length);
      this.playerCards = data;
      for (let p = 0; p < this.playerCards.length; p ++) {
        console.log(this.playerCards[p].playerId + ' - playerId for pos: ' + this.playerCards[p].cardPositionText);
      }
    }, error => {
      this.alertify.error(error);
    }, () => {
      // update the loaded
      this.loaded = 1;
    });
    // this.loadTeamDetails();
  }

  // loadTeamDetails() {
  //   this.teamDetailService.GetTeamDetailsForUser(this.authService.decodedToken.nameid).subscribe(data => {
  //     // Get the Team Details for the User
  //     this.teamDetails = data;

  //     // Need to run 13 times through to set up the team display
  //     for (let i = 0; i < 13; i ++) {
  //       const currentPosition = i + 1;

  //       // Firstly need to check whether this position has been set yet
  //       for (let j = 0; j < this.teamDetails.length; j ++) {
  //         if (this.teamDetails[j].position === currentPosition) {
  //           console.log('teamDetails object id: ' + this.teamDetails[j].playerId + ' and position: ' + this.teamDetails[j].position);

  //           // Then we have a match for the position and need to add the player card
  //           // this.addPlayerCardFromTeamDetail(this.teamDetails[j]);
  //           this.playerService.getPlayer(this.teamDetails[j].playerId).subscribe(value => {
  //             console.log('value returned for player: ' + value.firstName + ' ' + value.surname);

  //             const currPlayer = value;
  //             const newPlayerCard: Playercard = {
  //               firstName: currPlayer.firstName,
  //               surname: currPlayer.surname,
  //               team: currPlayer.team,
  //               price: currPlayer.price,
  //               playerId: currPlayer.playerId,
  //               averageScore: 0,
  //               lastScore: 0,
  //               cardPosition: this.teamDetails[j].position,
  //               cardPositionText: this.getTextPosition(this.teamDetails[j].position),
  //               playerPosition: currPlayer.positionOne
  //             };
  //             console.log('playerCards length: ' + this.playerCards.length);
  //             this.playerCards.push(newPlayerCard);
  //           }, error => {
  //             this.alertify.error(error);
  //           }, () => {
  //             console.log('completed getting player');
  //             this.playerAdded++;
  //             console.log('player added: ' + this.playerAdded);
  //           });
  //         }
  //       }

  //       if (this.playerAdded === 0) {
  //         // Now we need to add an empty player card as this position has not been selected
  //         this.addEmptyPlayerCard(currentPosition);
  //       }
  //     }
  //   }, error => {
  //     this.alertify.error(error);
  //   }, () => {
  //     console.log('playerCards length: ' + this.playerCards.length);
  //     // setTimeout(() => { this.loaded = 1; }, 12000 );
  //     // console.log('id 1: ' + this.playerCards[0].playerId);
  //     // console.log('id 12: ' + this.playerCards[12].playerId);
  //     // while (this.playerAdded !== 13) {
  //     //   this.loaded = 0;
  //     //   console.log(this.playerAdded);
  //     // }
  //     // console.log('id 1: ' + this.playerCards[0].playerId);
  //     // console.log('id 2: ' + this.playerCards[1].playerId);
  //     // console.log('id 3: ' + this.playerCards[2].playerId);
  //     // console.log('id 4: ' + this.playerCards[3].playerId);
  //     // console.log('id 5: ' + this.playerCards[4].playerId);
  //     // console.log('id 6: ' + this.playerCards[5].playerId);
  //     // console.log('id 7: ' + this.playerCards[6].playerId);
  //     // console.log('id 8: ' + this.playerCards[7].playerId);
  //     // console.log('id 9: ' + this.playerCards[8].playerId);
  //     // console.log('id 10: ' + this.playerCards[9].playerId);
  //     // console.log('id 11: ' + this.playerCards[10].playerId);
  //     // console.log('id 12: ' + this.playerCards[11].playerId);
  //     // console.log('id 13: ' + this.playerCards[12].playerId);
  //     this.loaded = 1;

  //   });
  // }

  // addPlayerCardFromTeamDetail(currentTeamDetail: TeamDetail) {
  //   // Need to get the player
  //   console.log('TeamDetail object: ' + currentTeamDetail.playerId);

  //   this.playerService.getPlayer(currentTeamDetail.playerId).subscribe(value => {
  //     console.log('value returned for player: ' + value.firstName + ' ' + value.surname);

  //     const currPlayer = value;
  //     const newPlayerCard: Playercard = {
  //       firstName: currPlayer.firstName,
  //       surname: currPlayer.surname,
  //       team: currPlayer.team,
  //       price: currPlayer.price,
  //       playerId: currPlayer.playerId,
  //       averageScore: 0,
  //       lastScore: 0,
  //       cardPosition: currentTeamDetail.position,
  //       cardPositionText: this.getTextPosition(currentTeamDetail.position),
  //       playerPosition: currPlayer.positionOne
  //     };
  //     console.log('playerCards length: ' + this.playerCards.length);
  //     this.playerCards.push(newPlayerCard);
  //     this.playerAdded++;
  //     console.log('player added: ' + this.playerAdded);
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  // addEmptyPlayerCard(currentPosition: number) {
  //   // Need to add an empty player card
  //   const newPlayerCard: Playercard = {
  //     firstName: '',
  //     surname: '',
  //     team: '',
  //     price: 0,
  //     playerId: 0,
  //     lastScore: 0,
  //     averageScore: 0,
  //     cardPositionText: this.getTextPosition(currentPosition),
  //     cardPosition: currentPosition,
  //     playerPosition: 0
  //   };
  //   this.playerCards.push(newPlayerCard);
  //   this.playerAdded++;
  //   console.log('player added: ' + this.playerAdded);
  // }

  playerSelected(position: number) {
    // console.log('position selected is ' + position);
    localStorage.setItem('currentSelectPosition', position.toString());

    // How does this value get passed correctly
    this.router.navigate(['selectplayer/', position]);
  }

  // getTextPosition(pos: number) {
  //   let positionString = '';

  //   switch (pos) {
  //     case 1:
  //       positionString = 'Point Guard';
  //       break;
  //     case 2:
  //       positionString = 'Shooting Guard';
  //       break;
  //     case 3:
  //       positionString = 'Small Forward';
  //       break;
  //     case 4:
  //       positionString = 'Power Forward';
  //       break;
  //     case 5:
  //       positionString = 'Centre';
  //       break;
  //     case 6:
  //       positionString = 'Bench #1';
  //       break;
  //     case 7:
  //       positionString = 'Bench #2';
  //       break;
  //     case 8:
  //       positionString = 'Bench #3';
  //       break;
  //     case 9:
  //       positionString = 'Bench #4';
  //       break;
  //     case 10:
  //       positionString = 'Bench #5';
  //       break;
  //     case 11:
  //       positionString = 'Inactive #1';
  //       break;
  //     case 12:
  //       positionString = 'Inactive #2';
  //       break;
  //     case 13:
  //       positionString = 'Inactive #3';
  //       break;
  //   }

  //   return positionString;
  // }
}
