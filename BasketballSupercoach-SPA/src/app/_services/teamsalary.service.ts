import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsalaryService {
  baseUrl = environment.apiUrl + 'teamsalary/';

  constructor(private http: HttpClient) { }

  createTeamSalary(userId: any) {
    console.log('inside team salary service');
    console.log(this.baseUrl + 'createsalary', userId);
    return this.http.post(this.baseUrl + 'createsalary', userId);
  }
}
