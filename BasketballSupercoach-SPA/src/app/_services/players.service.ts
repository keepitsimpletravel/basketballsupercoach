import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../_models/player';
import { Scoreforplayer } from '../_models/scoreforplayer';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Scoreforplayer[]> {
    return this.http.get<Scoreforplayer[]>(this.baseUrl + 'players/');
  }

  getSpecificPlayers(pos): Observable<Scoreforplayer[]> {
    return this.http.get<Scoreforplayer[]>(this.baseUrl + 'players/filtered/' + pos);
  }

  getPlayer(id): Observable<Player> {
    return this.http.get<Player>(this.baseUrl + 'players/' + id);
  }
}
