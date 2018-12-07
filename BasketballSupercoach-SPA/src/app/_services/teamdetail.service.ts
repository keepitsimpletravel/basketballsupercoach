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

  // GetTeamDetailsForUser (userId: number) {
  //   return this.http.get<TeamDetail[]>(this.baseUrl + userId);
  // }

  GetPlayerCardsForUser (userId: number) {
    console.log('calling get player cards api');

    // not sure if this returned or not
    return this.http.get<Playercard[]>(this.baseUrl + userId);
  }
}
