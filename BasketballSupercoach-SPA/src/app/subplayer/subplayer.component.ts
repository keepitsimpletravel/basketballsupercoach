import { Component, OnInit } from '@angular/core';
import { Playercard } from '../_models/playercard';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamdetailService } from '../_services/teamdetail.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-subplayer',
  templateUrl: './subplayer.component.html',
  styleUrls: ['./subplayer.component.css']
})
export class SubplayerComponent implements OnInit {
  playercard: Playercard;
  playerCards: Playercard[] = [];
  subPlayers: Playercard[] = [];
  loaded = 0;
  selected = 0;
  subbingPlayercard: Playercard = {};

  constructor(private alertify: AlertifyService, private dataRoute: ActivatedRoute,
     private teamDetailService: TeamdetailService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.playercard = JSON.parse(this.dataRoute.snapshot.params['playercard']);

    console.log(this.playercard.cardPosition + ' - the selected position');
    // Need to get all of the player cards
    this.teamDetailService.GetPlayerCardsForUser(this.authService.decodedToken.nameid).subscribe(data => {
      // console.log('data returned for player cards length: ' + data.length);
      this.playerCards = data;
      for (let p = 0; p < this.playerCards.length; p ++) {
        // Need to check that the playercard is not the player being moved
        if (this.playerCards[p].cardPosition !== this.playercard.cardPosition) {
          // Now we need to check if the player can player the starting positions
          // The player is on the bench so the subbing player does not matter, the player being selected does
          if (this.playerCards[p].playerPosition === this.playercard.cardPosition) {
            this.subPlayers.push(this.playerCards[p]);
            console.log('Added - ' + this.playerCards[p].firstName + ' ' + this.playerCards[p].surname);
          }
        }
      }
      console.log('available players lenght: - ' + this.subPlayers.length);
    }, error => {
      this.alertify.error(error);
    }, () => {
      // update the loaded
      this.loaded = 1;
    });
  }

  playerSub(subWith: number) {
    // console.log('selected position number: ' + subWith);
    for (let p = 0; p < this.playerCards.length; p ++) {
      if (this.playerCards[p].cardPosition === subWith) {
        this.subbingPlayercard = this.playerCards[p];
        // console.log('aaaaaaaaaaa - ' + this.subbingPlayercard.cardPositionText);
      }
    }

    // console.log(this.subbingPlayercard.firstName + ' '
    //  + this.subbingPlayercard.surname + ' - ' + this.subbingPlayercard.cardPosition + ' at ' + this.subbingPlayercard.cardPositionText);

    const positionText = this.subbingPlayercard.cardPositionText;

    //  console.log(this.playercard.firstName + ' '
    //  + this.playercard.surname + ' - ' + this.playercard.cardPosition);

     const newOrigPlayer = this.subbingPlayercard;
     newOrigPlayer.cardPosition = this.playercard.cardPosition;
     newOrigPlayer.cardPositionText = this.playercard.cardPositionText;

     // This is correct
    //  console.log(newOrigPlayer.firstName + ' '
    //  + newOrigPlayer.surname + ' - ' + newOrigPlayer.cardPosition + ' correct');

     const newMovePlayer = this.playercard;
     newMovePlayer.cardPosition = subWith;
     newMovePlayer.cardPositionText = positionText;

    //  console.log(newMovePlayer.firstName + ' '
    //  + newMovePlayer.surname + ' - ' + newMovePlayer.cardPosition + ' pos: ' + newMovePlayer.cardPositionText);

    for (let p = 0; p < this.playerCards.length; p ++) {
      if (this.playerCards[p].playerId === this.playercard.playerId) {
        // console.log('updating original player');
        this.playerCards[p] = newMovePlayer;
      } else if (this.playerCards[p].playerId === this.subbingPlayercard.playerId) {
        // console.log('updating moving player');
        this.playerCards[p] = newOrigPlayer;
      }
    }

    // for (let p = 0; p < this.playerCards.length; p ++) {
    //   console.log('Player ' + p + ' is ' +  this.playerCards[p].surname +
    //    ' at ' + this.playerCards[p].cardPosition + ', ' + this.playerCards[p].cardPositionText);
    // }

    // Now need to write to the database
    for (let p = 0; p < this.playerCards.length; p ++) {
      this.teamDetailService.updateTeamDetailRecord(this.playerCards[p]).subscribe(data => {
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.alertify.success('Team Saved Successfully');
      });
    }

    // Only once this is completed will the page go back to team
    this.router.navigate(['team/']);
  }

}
