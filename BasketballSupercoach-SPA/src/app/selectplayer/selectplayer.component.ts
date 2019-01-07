import { Component, OnInit } from '@angular/core';
import { Player } from '../_models/player';
import { TeamDetail } from '../_models/teamdetail';
import { PlayersService } from '../_services/players.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamdetailService } from '../_services/teamdetail.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { TeamsalaryService } from '../_services/teamsalary.service';
import { TeamSalary } from '../_models/teamsalary';
import { Scoreforplayer } from '../_models/scoreforplayer';
// import { Playerwithscore } from '../_models/playerWithScore';

@Component({
  selector: 'app-selectplayer',
  templateUrl: './selectplayer.component.html',
  styleUrls: ['./selectplayer.component.css']
})
export class SelectplayerComponent implements OnInit {
  players: Scoreforplayer[];
  selectedPlayer: Player;
  position: number;
  currentUser: User;

  cols: any[];

  teams: any[];

  colors: any[];

  yearFilter: number;

  yearTimeout: any;

  // tslint:disable-next-line:no-inferrable-types
  first: number = 0;

  loading: boolean;

  model: any = {};
  availableSalary: number;
  salaryObject: TeamSalary;
  user: User;

  // tslint:disable-next-line:max-line-length
  constructor(private playerService: PlayersService, private teamSalaryService: TeamsalaryService, private alertify: AlertifyService, private route: ActivatedRoute, private teamDetailService: TeamdetailService, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    // console.log('param: ' +  this.route.snapshot.params['pos']);
    // console.log('param: ' +  +this.route.snapshot.params['pos']);
    // console.log('userId - ' + this.authService.decodedToken.nameid);
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      this.user = user;
      console.log(user);

      // this.createTeamSalary();
      this.teamSalaryService.getTeamSalary(this.user.id).subscribe(next => {
        // console.log('got team salary value - ' + next.availableSalary);
        this.availableSalary = next.availableSalary;
        this.salaryObject = next;
      }, error => {
        this.alertify.error(error);
      });
    }, error => {
      this.alertify.error(error);
    });

    // this.position = +localStorage.getItem('currentSelectPosition'); // this is not being updated properly
    this.position = +this.route.snapshot.params['pos'];

    this.loading = true;
        setTimeout(() => {
            console.log('players about to be filtered');
            // this.playerService.getSpecificPlayers(+this.route.snapshot.params['pos']).subscribe(data => {
            //   this.players = data['specificplayers'];
            //   console.log('players received' + this.players);
            // }, error => {
            //   this.alertify.error(error);
            // });
            this.route.data.subscribe(data => {
              this.players = data['specificplayers'];
              // console.log('players received' + this.players);
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
    console.log('the selected player id is: ' + playerId);

    // Need the price value to be checked against available salary
    if (price <= this.availableSalary) {
      // Then the player is affordable
      // Need to create a TeamDetail record for this player
      this.model.captain = 0;
      this.model.emergency = 0;
      this.model.sixthMan = 0;
      this.model.position = this.position; // this is wrong!
      this.model.playerId = playerId;
      this.model.userId = this.authService.decodedToken.nameid;

      // Now need to pass the model somewhere
      this.teamDetailService.createTeamDetail(this.model).subscribe(next => {
        this.alertify.success('player selection saved successfully');
        // Need to add check to see if set salary is needed to be set to 1
        this.userService.getUser(this.authService.decodedToken.nameid).subscribe(curr => {
          // if (curr.salarySet === 0) {
          // }
        }, error => {
          this.alertify.error(error);
        }, () => {
          // this.router.navigate(['/dashboard']);
        });

      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/team']);
      });

      // Need to update the teams available salary
      this.availableSalary = this.availableSalary - price;
      this.salaryObject.availableSalary = this.availableSalary;

      this.teamSalaryService.updateTeamSalary(this.salaryObject).subscribe(next => {

      }, error => {
        this.alertify.error(error);
      });

    } else {
      this.alertify.error('You cannot afford this player');
    }
  }

}
