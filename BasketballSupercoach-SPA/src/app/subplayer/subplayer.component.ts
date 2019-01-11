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

    console.log(this.playercard.cardPosition + ' - the selected position'); // this is correct
    // Need to get all of the player cards
    this.teamDetailService.GetPlayerCardsForUser(this.authService.decodedToken.nameid).subscribe(data => {
      // console.log('data returned for player cards length: ' + data.length);
      this.playerCards = data;
      // console.log('length is: ' + this.playerCards.length);
      for (let p = 0; p < this.playerCards.length; p ++) {
        if (this.playerCards[p].cardPosition !== this.playercard.cardPosition) {
          if (this.playercard.cardPosition <= 5) {
            // Now need to check the other cards and whether they can play the position
            if (this.playercard.cardPosition === this.playerCards[p].playerPosition) {
              // Then the player can play the position
              this.subPlayers.push(this.playerCards[p]);
              // tslint:disable-next-line:max-line-length
              console.log('Added - ' + this.playerCards[p].firstName + ' ' + this.playerCards[p].surname + 'current position = ' + this.playerCards[p].cardPosition);
            }
          } else {
            if (this.playerCards[p].cardPosition <= 5) {
              if (this.playercard.playerPosition === this.playerCards[p].cardPosition) {
                this.subPlayers.push(this.playerCards[p]);
                // tslint:disable-next-line:max-line-length
              console.log('Added - ' + this.playerCards[p].firstName + ' ' + this.playerCards[p].surname + 'current position = ' + this.playerCards[p].cardPosition);
              }
            } else {
              this.subPlayers.push(this.playerCards[p]);
              // tslint:disable-next-line:max-line-length
              console.log('Added - ' + this.playerCards[p].firstName + ' ' + this.playerCards[p].surname + 'current position = ' + this.playerCards[p].cardPosition);
            }
          }
        }

        // // Need to check that the playercard is not the player being moved
        // if (this.playerCards[p].cardPosition !== this.playercard.cardPosition) {

        //   // Now we need to check if the player can player the starting positions
        //   // The player is on the bench so the subbing player does not matter, the player being selected does
        //   if (this.playerCards[p].playerPosition === this.playercard.cardPosition) {
        //     this.subPlayers.push(this.playerCards[p]);
        //     // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:max-line-length
        //     console.log('Added - ' + this.playerCards[p].firstName + ' ' + this.playerCards[p].surname + 'current position = ' + this.playerCards[p].cardPosition);
        //   }
        // }
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
    original.cardPosition = newPos;
    original.averageScore = moveWith.averageScore * 100;
    moveWith.cardPosition = originalPos;
    moveWith.averageScore = original.averageScore * 100;

    console.log('original: ' + original.surname + ' at pos: ' + original.cardPosition);
    console.log('moveWith: ' + moveWith.surname + ' at pos: ' + moveWith.cardPosition);

    console.log('playersToMove: ' + this.playersToMove.length);
    this.playersToMove.push(original);
    this.playersToMove.push(moveWith);
    console.log('playersToMove: ' + this.playersToMove.length);

    console.log('original: ' + this.playersToMove[0].surname + ' at pos: ' + this.playersToMove[0].cardPosition);
    console.log('moving: ' + this.playersToMove[1].surname + ' at pos: ' + this.playersToMove[1].cardPosition);

    this.teamDetailService.updateSubTeamDetailRecords(this.playersToMove).subscribe(data => {

    }, error => {
      this.alertify.error(error);
    }, () => {
      console.log('SUB PLAYERS HAS COMPLETED SUCCESSFULLY');
      this.playersToMove = [];
      this.alertify.success('Team Saved Successfully');
      // Only once this is completed will the page go back to team
      this.router.navigate(['team/']);
    });
  }

}
