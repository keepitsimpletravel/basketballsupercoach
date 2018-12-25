import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Round } from '../_models/round';

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

RunTeamScoresForDate(value: string) {
  console.log('inside run team scores service ' + this.baseUrl + 'team/' + value);
  return this.http.get<number>(this.baseUrl + value);
}

CreateNewRound(newRound: Round) {
  console.log('inside run team scores service ' + this.baseUrl);
  return this.http.post(this.baseUrl + 'createround', newRound);
}

CreateTeamScoresForRound(round: Round) {
  console.log('round value in service: ' + round);
  // const r = round.toString();
  return this.http.post(this.baseUrl + 'createteamscores', round);
}

}
