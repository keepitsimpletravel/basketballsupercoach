import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamdetailService {
  baseUrl = environment.apiUrl + 'teamdetail/';

constructor(private http: HttpClient) { }

// createTeamDetail () {

// }

// register(model: any) {
//   return this.http.post(this.baseUrl + 'register', model);
// }

}
