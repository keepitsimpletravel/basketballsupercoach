import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Scoringsystem } from '../_models/scoringsystem';

@Injectable({
  providedIn: 'root'
})
export class ScoringsystemService {
baseUrl = environment.apiUrl + 'scoringsystem/';

constructor(private http: HttpClient) { }
GetScoringSystem () {
  return this.http.get<Scoringsystem>(this.baseUrl);
}
}
