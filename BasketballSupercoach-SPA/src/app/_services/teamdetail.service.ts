import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TeamDetail } from '../_models/teamdetail';

@Injectable({
  providedIn: 'root'
})
export class TeamdetailService {
  baseUrl = environment.apiUrl + 'teamdetail/';

  constructor(private http: HttpClient) { }

  createTeamDetail (model: TeamDetail) {
    return this.http.post(this.baseUrl + 'create', model);
  }

}
