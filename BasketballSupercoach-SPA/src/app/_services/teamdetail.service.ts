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

  updateAllTeamDetailRecords (playercards: Playercard[]) {
    for (let p = 0; p < playercards.length; p ++) {
      playercards[p].userId = +localStorage.getItem('currentUserId');
      this.http.put<Playercard>(this.baseUrl + 'updateteamdetail', playercards[p]);
    }
    return 201;
  }
}
