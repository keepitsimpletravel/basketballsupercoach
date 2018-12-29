import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TeamDetail } from '../_models/teamdetail';
import { Player } from '../_models/player';
import { Playercard } from '../_models/playercard';

@Injectable({
  providedIn: 'root'
})
export class TeamdetailService {
  baseUrl = environment.apiUrl + 'teamdetail/';

  constructor(private http: HttpClient) { }

  createTeamDetail (model: TeamDetail) {
    return this.http.post(this.baseUrl + 'create', model);
  }

  GetPlayerCardsForUser (userId: number) {
    return this.http.get<Playercard[]>(this.baseUrl + userId);
  }

  updateTeamDetailRecord (playercard: Playercard) {
    playercard.userId = +localStorage.getItem('currentUserId');
    // console.log(this.baseUrl + 'updateteamdetail');
    return this.http.put<Playercard>(this.baseUrl + 'updateteamdetail', playercard);
  }

  updateSubTeamDetailRecords (playercards: Playercard[]) {
    for (let p = 0; p < playercards.length; p ++) {
      playercards[p].userId = +localStorage.getItem('currentUserId');
      console.log('sub players: ' + playercards[p].surname + ' pos: ' + playercards[p].cardPosition);
    }
    return this.http.put<Playercard[]>(this.baseUrl + 'updatesubteamdetail', playercards);
    // }
    // return 201;
  }

  getRoundrank (userid: number) {
    console.log('getRoundrank()');
    return this.http.get<number>(environment.apiUrl + 'teamrank/' + userid);
  }

  getRoundScore(userid: number) {
    return this.http.get<number>(environment.apiUrl + 'teamrank/score/' + userid);
  }

  getTotalScore(userid: number) {
    return this.http.get<number>(environment.apiUrl + 'teamrank/totalscore/' + userid);
  }

  getTotalRank(userid: number) {
    return this.http.get<number>(environment.apiUrl + 'teamrank/totalrank/' + userid);
  }

  getCurrentRound() {
    return this.http.get<number>(environment.apiUrl + 'teamrank/getround/');
  }

  getCompetitionStatus() {
    return this.http.get<number>(environment.apiUrl + 'runscores/getstatus/');
  }

  // updateTeamDetailsForSub (origPlayercard: Playercard, newPlayercard: Playercard) {
  //   origPlayercard.userId = +localStorage.getItem('currentUserId');
  //   newPlayercard.userId = +localStorage.getItem('currentUserId');
  //   this.http.put<Playercard[]>(this.baseUrl + 'subteamdetail', );
  // }
}
