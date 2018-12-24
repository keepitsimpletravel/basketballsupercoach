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
  playersToMove: Playercard[] = [];

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
            // tslint:disable-next-line:max-line-length
            console.log('Added - ' + this.playerCards[p].firstName + ' ' + this.playerCards[p].surname + 'current position = ' + this.playerCards[p].cardPosition);
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
    for (let p = 0; p < this.playerCards.length; p ++) {
      if (this.playerCards[p].cardPosition === subWith) {
        this.subbingPlayercard = this.playerCards[p];
      }
    }

    // Try saving the team detail for just the 2 records being moved
    const original = this.playercard;
    const moveWith = this.subbingPlayercard;

    console.log('original: ' + original.surname + ' at pos: ' + original.cardPosition);
    console.log('moveWith: ' + moveWith.surname + ' at pos: ' + moveWith.cardPosition);

    const originalPos = original.cardPosition;
    const newPos = moveWith.cardPosition;

    console.log('orig pos: ' + originalPos + ' new pos: ' + newPos);
    // const original
    // Something in here is broken
    // original.cardPosition = this.subbingPlayercard.cardPosition;
    // original.cardPositionText = this.subbingPlayercard.cardPositionText;
    // moveWith.cardPosition = this.playercard.cardPosition;
    // moveWith.cardPositionText = this.playercard.cardPositionText;
    original.cardPosition = newPos;
    moveWith.cardPosition = originalPos;



    this.playersToMove.push(original);
    this.playersToMove.push(moveWith);

    console.log('original: ' + this.playersToMove[0].surname + ' at pos: ' + this.playersToMove[0].cardPosition);
    console.log('moving: ' + this.playersToMove[1].surname + ' at pos: ' + this.playersToMove[1].cardPosition);

    this.teamDetailService.updateSubTeamDetailRecords(this.playersToMove).subscribe(data => {

    }, error => {
      this.alertify.error(error);
    }, () => {
      this.alertify.success('Team Saved Successfully');
      // Only once this is completed will the page go back to team
      this.router.navigate(['team/']);
    });

    // // Need to write these to the database
    // this.teamDetailService

    // const positionText = this.subbingPlayercard.cardPositionText;

    // const newOrigPlayer = this.subbingPlayercard;
    // newOrigPlayer.cardPosition = this.playercard.cardPosition;
    // newOrigPlayer.cardPositionText = this.playercard.cardPositionText;


    // const newMovePlayer = this.playercard;
    // newMovePlayer.cardPosition = subWith;
    // newMovePlayer.cardPositionText = positionText;

    // for (let p = 0; p < this.playerCards.length; p ++) {
    //   if (this.playerCards[p].playerId === this.playercard.playerId) {
    //     this.playerCards[p] = newMovePlayer;
    //   } else if (this.playerCards[p].playerId === this.subbingPlayercard.playerId) {
    //     this.playerCards[p] = newOrigPlayer;
    //   }
    // }

    // Now need to write to the database
    // for (let p = 0; p < this.playerCards.length; p ++) {
      // this.teamDetailService.updateSubTeamDetailRecords(this.playerCards).subscribe(data => {
      // }, error => {
      //   this.alertify.error(error);
      // }, () => {
      //   this.alertify.success('Team Saved Successfully');
      // });
    // }
  }

}
