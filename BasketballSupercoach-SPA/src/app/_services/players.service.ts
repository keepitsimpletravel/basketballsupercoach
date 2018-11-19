import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../_models/player';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + 'players/');
  }

  getPlayer(id): Observable<Player> {
    return this.http.get<Player>(this.baseUrl + 'players/' + id);
  }
}
