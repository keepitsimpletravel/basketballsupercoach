import { Component, OnInit } from '@angular/core';
import { ScoringsystemService } from '../_services/scoringsystem.service';
import { Scoringsystem } from '../_models/scoringsystem';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RunscoresService } from '../_services/runscores.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  scoringSystem: Scoringsystem = {};
  scoringForm: FormGroup;
  runscoresForm: FormGroup;
  selectedDate: Date;

  constructor(private scoringSystemService: ScoringsystemService, private fb: FormBuilder, private datePipe: DatePipe
    , private runScoresService: RunscoresService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createRunScoresForm();
    this.createScoringSystemForm();

    this.scoringSystemService.GetScoringSystem().subscribe(next => {
      this.scoringSystem = next;
    }, error => {

    }, () => {
      // update the form values
      this.scoringForm.setValue({
        points: this.scoringSystem.points,
        orebounds: this.scoringSystem.oRebounds,
        drebounds: this.scoringSystem.dRebounds,
        assists: this.scoringSystem.assists,
        steals: this.scoringSystem.steals,
        blocks: this.scoringSystem.blocks,
        threes: this.scoringSystem.madeThrees,
        turnovers: this.scoringSystem.turnovers,
        minutes: this.scoringSystem.minutes,
        doubledouble: this.scoringSystem.doubleDouble,
        tripledouble: this.scoringSystem.tripleDouble,
        quaddouble: this.scoringSystem.quadDouble
      });
    });
  }

  createScoringSystemForm() {
    this.scoringForm = this.fb.group({
      points: ['', Validators.required],
      orebounds: [''],
      drebounds: [''],
      assists: [''],
      steals: [''],
      blocks: [''],
      threes: [''],
      turnovers: [''],
      minutes: [''],
      doubledouble: [''],
      tripledouble: [''],
      quaddouble: ['']
    });
  }

  createRunScoresForm() {
    this.runscoresForm = this.fb.group({
      gameDate: ['']
    });
  }

  updateScoringSystem() {
    console.log(this.scoringForm.value);

    // console.log(this.scoringForm.controls['assists'].value);
    this.scoringSystem.assists = this.scoringForm.controls['assists'].value;
    this.scoringSystem.blocks = this.scoringForm.controls['blocks'].value;
    this.scoringSystem.dRebounds = this.scoringForm.controls['drebounds'].value;
    this.scoringSystem.doubleDouble = this.scoringForm.controls['doubledouble'].value;
    this.scoringSystem.madeThrees = this.scoringForm.controls['threes'].value;
    this.scoringSystem.minutes = this.scoringForm.controls['minutes'].value;
    this.scoringSystem.oRebounds = this.scoringForm.controls['orebounds'].value;
    this.scoringSystem.points = this.scoringForm.controls['points'].value;
    this.scoringSystem.quadDouble = this.scoringForm.controls['quaddouble'].value;
    this.scoringSystem.steals = this.scoringForm.controls['steals'].value;
    this.scoringSystem.tripleDouble = this.scoringForm.controls['quaddouble'].value;
    this.scoringSystem.turnovers = this.scoringForm.controls['turnovers'].value;

    // Need to update from here
    this.scoringSystemService.UpdateScoringSystem(this.scoringSystem).subscribe(next => {

    }, error => {
      console.log(error);
    });
  }

  runScores() {
    this.selectedDate = this.runscoresForm.get('gameDate').value;
    const latest_date = this.datePipe.transform(this.selectedDate, 'yyyyMMdd');
    console.log('Date formatted: ' + latest_date);

    this.runScoresService.RunScoresForDate(latest_date).subscribe(next => {
      console.log('run scores body - next value: ' + next);
    }, error => {
      console.log(error);
    }, () => {
      this.alertify.success('Player scores run in successfully');
    });
  }

}
