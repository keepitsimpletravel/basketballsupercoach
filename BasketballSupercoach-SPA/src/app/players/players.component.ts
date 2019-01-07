import { Component, OnInit } from '@angular/core';
import { Player } from '../_models/player';
import { PlayersService } from '../_services/players.service';
import { AlertifyService } from '../_services/alertify.service';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { ActivatedRoute } from '@angular/router';
import { Scoreforplayer } from '../_models/scoreforplayer';
// import { Playerwithscore } from '../_models/playerWithScore';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit {

  players: Scoreforplayer[];
  selectedPlayer: Player;

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
      this.loading = true;
        setTimeout(() => {
            this.route.data.subscribe(data => {
              this.players = data['players'];
              for (let i = 0; i < this.players.length; i++) {
                this.players[i].lastScore = this.players[i].lastScore / 100;
                // console.log(this.players[i].averageScore);
                this.players[i].averageScore = this.players[i].averageScore / 100;
                this.players[i].totalScore = this.players[i].totalScore / 100;
              }
            });
            this.loading = false;
        }, 1000);

      this.cols = [
              { field: 'team', header: 'Team' },
              { field: 'firstName', header: 'Given Name' },
              { field: 'surname', header: 'Surname' },
              { field: 'price', header: 'Price' },
              { field: 'positionOne', header: 'Position' },
              { field: 'lastScore', header: 'Last Score' },
              { field: 'averageScore', header: 'Average Score' },
              { field: 'totalScore', header: 'Total Score' }
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

  onYearChange(event, dt) {
      if (this.yearTimeout) {
          clearTimeout(this.yearTimeout);
      }

      this.yearTimeout = setTimeout(() => {
          dt.filter(event.value, 'year', 'gt');
      }, 250);
  }

  reset() {
    this.first = 0;
  }

  selectPlayerWithButton(player: Player) {
    this.selectedPlayer = player;
  }
}
