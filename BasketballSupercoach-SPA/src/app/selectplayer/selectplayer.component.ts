import { Component, OnInit } from '@angular/core';
import { Player } from '../_models/player';
import { PlayersService } from '../_services/players.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selectplayer',
  templateUrl: './selectplayer.component.html',
  styleUrls: ['./selectplayer.component.css']
})
export class SelectplayerComponent implements OnInit {
  players: Player[];
  selectedPlayer: Player;
  position: number;

  cols: any[];

  teams: any[];

  colors: any[];

  yearFilter: number;

  yearTimeout: any;

  // tslint:disable-next-line:no-inferrable-types
  first: number = 0;

  loading: boolean;

  constructor(private playerService: PlayersService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.position = +localStorage.getItem('currentSelectPosition');

    this.loading = true;
        setTimeout(() => {
            console.log('players about to be filtered');
            this.route.data.subscribe(data => {
              this.players = data['specificplayers'];
              console.log('players received' + this.players);
            });
            this.loading = false;
        }, 1000);

      this.cols = [
              { field: 'team', header: 'Team' },
              { field: 'firstName', header: 'Given Name' },
              { field: 'surname', header: 'Surname' },
              { field: 'price', header: 'Price' },
              { field: 'positionOne', header: 'Position' }
            ];
      this.teams = [
              { label: 'All Teams', value: null },
              { label: 'Atlanta', value: 'ATL' },
              { label: 'Boston', value: 'BOS' },
              { label: 'Brooklyn', value: 'BKN' },
              { label: 'Charlotte', value: 'CHA' },
              { label: 'Chicago', value: 'CHI' },
              { label: 'Cleveland', value: 'CLE' },
              { label: 'Dallas', value: 'DAL' },
              { label: 'Denver', value: 'DEN' },
              { label: 'Detroit', value: 'DET' },
              { label: 'Golden State', value: 'GSW' },
              { label: 'Houston', value: 'HOU' },
              { label: 'Indiana', value: 'IND' },
              { label: 'LA Clippers', value: 'LAC' },
              { label: 'LA Lakers', value: 'LAL' },
              { label: 'Memphis', value: 'MEM' },
              { label: 'Miami', value: 'MIA' },
              { label: 'Milwaukee', value: 'MIL' },
              { label: 'Minnesota', value: 'MIN' },
              { label: 'New Orleans', value: 'NOP' },
              { label: 'New York', value: 'NYK' },
              { label: 'Oklahoma City', value: 'OKC' },
              { label: 'Orlando', value: 'ORL' },
              { label: 'Philadelphia', value: 'PHI' },
              { label: 'Phoenix', value: 'PHO' },
              { label: 'Portland', value: 'POR' },
              { label: 'Sacromento', value: 'SAC' },
              { label: 'San Antonio', value: 'SAN' },
              { label: 'Toronto', value: 'TOR' },
              { label: 'Utah', value: 'UTA' },
              { label: 'Washington', value: 'WAS' }
          ];
  }

  playerSelected(playerId: number) {
    console.log('the selected player id is: ' + playerId);

    // Need to create a TeamDetail record for this player

  }

}
