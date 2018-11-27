import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../_models/player';

@Injectable({
  providedIn: 'root'
})
export class FilteredplayersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSpecificPlayers(pos): Observable<Player[]> {
    console.log(this.baseUrl + 'players/filtered/' + pos);
    return this.http.get<Player[]>(this.baseUrl + 'players/filtered/' + pos);
  }
}
