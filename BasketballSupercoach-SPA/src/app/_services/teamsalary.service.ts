import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TeamSalary } from '../_models/teamsalary';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class TeamsalaryService {
  baseUrl = environment.apiUrl + 'teamsalary/';

  constructor(private http: HttpClient) { }

  createTeamSalary(model: TeamSalary) {
    // console.log('inside team salary service');
    console.log('inside team salary service');
    console.log('model - ' + model.id + ' userID - ' + model.userId + ' and salaray - ' + model.availableSalary);
    return this.http.post(this.baseUrl + 'createsalary', model);
  }

  getTeamSalary(userId: number) {
    console.log('insde team salary service - get - userId = ' + userId);
    console.log('url: ' + this.baseUrl + userId);
    return this.http.get<TeamSalary>(this.baseUrl + userId);
  }
}
