import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { TeamsalaryService } from '../_services/teamsalary.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Playercard } from '../_models/playercard';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Player } from '../_models/player';
import { PlayersService } from '../_services/players.service';
import { TeamdetailService } from '../_services/teamdetail.service';
import { TeamSalary } from '../_models/teamsalary';
import { Scoreforplayer } from '../_models/scoreforplayer';
// import { Playerwithscore } from '../_models/playerWithScore';

@Component({
  selector: 'app-tradeplayer',
  templateUrl: './tradeplayer.component.html',
  styleUrls: ['./tradeplayer.component.css']
})
export class TradeplayerComponent implements OnInit {
  @Output() returnPlayercard = new EventEmitter<Playercard>();
  availableSalary: number;
  user: User;
  playercard: Playercard;
  tradingPlayercard: Playercard = {};
  selected = 0;
  tradePlay: Player[];
  selectedPlayer: Player;

  players: Scoreforplayer[];
  teams: any[];
  cols: any[];
  loading: boolean;

  salaryObject: TeamSalary;

  constructor(private alertify: AlertifyService, private dataRoute: ActivatedRoute, private router: Router,
    private userService: UserService, private teamSalaryService: TeamsalaryService, private authService: AuthService,
    private playerService: PlayersService, private teamDetailService: TeamdetailService) { }

  ngOnInit() {
    // this.tradingPlayercard = new Playercard();
    this.playercard = JSON.parse(this.dataRoute.snapshot.params['playercard']);

    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      this.user = user;

      this.teamSalaryService.getTeamSalary(this.user.id).subscribe(next => {
        this.salaryObject = next;
        this.availableSalary = next.availableSalary + this.playercard.price;
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });

    this.loading = true;
        setTimeout(() => {
            // this.route.data.subscribe(data => {
            //   this.players = data['specificplayers'];
            // });

            // Need to call the getPlayers for position
            this.playerService.getSpecificPlayers(this.playercard.cardPosition).subscribe(data => {
              this.players = data;
              for (let i = 0; i < this.players.length; i++) {
                this.players[i].lastScore = this.players[i].lastScore / 100;
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
          { field: 'lastScore', header: 'Last Score' }
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

  playerSelected(playerId: number, price: number) {
    console.log('Player Selected for Trade - playerId = ' + playerId + ' and price: ' + price);

    // Firstly need to check salary verse price
    if (price > this.availableSalary) {
      this.alertify.error('You cannot afford this player');
    } else {
      // tslint:disable-next-line:prefer-const
      this.tradePlay = this.players.filter(p => p.playerId === playerId);
      this.selectedPlayer = this.tradePlay[0];

      // need to convert the player to the Playercard value - NEED TO FIX UNDEFEINED ISSUE
      this.tradingPlayercard.averageScore = 0;
      this.tradingPlayercard.cardPosition = this.playercard.cardPosition;
      this.tradingPlayercard.cardPositionText = this.playercard.cardPositionText;
      this.tradingPlayercard.firstName = this.selectedPlayer.firstName;
      this.tradingPlayercard.isCaptain = 0;
      this.tradingPlayercard.isEmergency = 0;
      this.tradingPlayercard.isSixthMan = 0;
      this.tradingPlayercard.lastScore = 0;
      this.tradingPlayercard.playerId = this.selectedPlayer.playerId;
      this.tradingPlayercard.playerPosition = this.selectedPlayer.positionOne;
      this.tradingPlayercard.price = this.selectedPlayer.price;
      this.tradingPlayercard.surname = this.selectedPlayer.surname;
      this.tradingPlayercard.team = this.selectedPlayer.team;

      this.selected = 1;
    }
  }

  tradePlayer() {
    this.teamDetailService.updateTeamDetailRecord(this.tradingPlayercard).subscribe(data => {
      this.salaryObject.availableSalary = this.availableSalary - this.tradingPlayercard.price;
      this.teamSalaryService.updateTeamSalary(this.salaryObject).subscribe(next => {

      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.alertify.success('Team Saved Successfully');
      this.router.navigate(['team/']);
    });
  }
}
