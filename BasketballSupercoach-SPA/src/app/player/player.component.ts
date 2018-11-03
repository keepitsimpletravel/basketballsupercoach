import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  players: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.http.get('http://localhost:5000/api/players').subscribe(response => {
      this.players = response;
    }, error => {
      console.log(error);
    });
  }
}
