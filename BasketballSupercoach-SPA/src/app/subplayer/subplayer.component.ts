import { Component, OnInit } from '@angular/core';
import { Playercard } from '../_models/playercard';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private alertify: AlertifyService, private dataRoute: ActivatedRoute,
     private teamDetailService: TeamdetailService, private authService: AuthService) { }

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

}
