import { Component, OnInit } from '@angular/core';
import { ScoringsystemService } from '../_services/scoringsystem.service';
import { Scoringsystem } from '../_models/scoringsystem';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  scoringSystem: Scoringsystem;

  constructor(private scoringSystemService: ScoringsystemService) { }

  ngOnInit() {
    this.scoringSystemService.GetScoringSystem().subscribe(next => {
      this.scoringSystem = next;
      console.log('points value is ' + this.scoringSystem.points);
    });
  }

}
