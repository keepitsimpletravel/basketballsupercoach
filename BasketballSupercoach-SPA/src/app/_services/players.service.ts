import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../_models/player';
import { Playerwithscore } from '../_models/playerWithScore';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Playerwithscore[]> {
    return this.http.get<Playerwithscore[]>(this.baseUrl + 'players/');
  }

  getSpecificPlayers(pos): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + 'players/filtered/' + pos);
  }

  getPlayer(id): Observable<Player> {
    return this.http.get<Player>(this.baseUrl + 'players/' + id);
  }
}
