import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Round } from '../_models/round';
// import { Rundate } from '../_models/runDate';
import { Lockout } from '../_models/lockout';
import { Daterun } from '../_models/daterun';

@Injectable({
  providedIn: 'root'
})
export class RunscoresService {
  baseUrl = environment.apiUrl + 'runscores/';

constructor(private http: HttpClient) { }

RunScoresForDate (value: string) {
  console.log('inside run scores service ' + this.baseUrl + value);
  return this.http.get<number>(this.baseUrl + value);
}

RunTeamScoresForDate(value: Daterun) {
  console.log('Running Team Scores service - ' + value.runDate);
  return this.http.put(this.baseUrl + 'updateteamscores', value);
}

CreateNewRound(newRound: Round) {
  // console.log('inside run team scores service ' + this.baseUrl);
  return this.http.post(this.baseUrl + 'createround', newRound);
}

CreateTeamScoresForRound(round: Round) {
  console.log('round value in service for: ' + round);
  // const r = round.toString();
  return this.http.post(this.baseUrl + 'createteamscores', round);
}

UpdateLockout(value: Lockout) {
  return this.http.put(this.baseUrl + 'updatelockout', value);
}

CreateNewTeamScores(round: Number) {
  return this.http.post(this.baseUrl + 'createnewteamscores', round);
}

}
