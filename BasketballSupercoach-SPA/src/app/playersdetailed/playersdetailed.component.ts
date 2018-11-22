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

  constructor(private playerService: PlayersService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadPlayer();
  }

  loadPlayer() {
    this.playerService.getPlayer(+this.route.snapshot.params['id']).subscribe((player: Player) => {
      this.player = player;
    }, error => {
      this.alertify.error(error);
    });
  }

}
