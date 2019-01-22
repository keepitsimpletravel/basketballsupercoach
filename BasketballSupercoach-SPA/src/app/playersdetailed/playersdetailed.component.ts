import { Component, OnInit } from '@angular/core';
import { Player } from '../_models/player';
import { PlayersService } from '../_services/players.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playersdetailed',
  templateUrl: './playersdetailed.component.html',
  styleUrls: ['./playersdetailed.component.css']
})
export class PlayersdetailedComponent implements OnInit {
  player: Player;
  gameData: any;
  data: any;

  constructor(private playerService: PlayersService, private alertify: AlertifyService, private route: ActivatedRoute) {
    // this.data = {
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [
    //       {
    //           label: 'My First dataset',
    //           backgroundColor: '#42A5F5',
    //           borderColor: '#1E88E5',
    //           data: [65, 59, 80, 81, 56, 55, 40]
    //       },
    //       {
    //           label: 'My Second dataset',
    //           backgroundColor: '#9CCC65',
    //           borderColor: '#7CB342',
    //           data: [28, 48, 40, 19, 86, 27, 90]
    //       }
    //   ]
    // }
    this.gameData = {
      labels: ['#1', '#2', '#3', '#4', '#5'],
      datasets: [
          {
              label: 'Score',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [14, 7, 42, 32]
          }
      ]};
  }

  ngOnInit() {
    // this.loadPlayer();
    this.route.data.subscribe(data => {
      this.player = data['player'];
    });
  }

  // loadPlayer() {
  //   this.playerService.getPlayer(+this.route.snapshot.params['id']).subscribe((player: Player) => {
  //     this.player = player;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
