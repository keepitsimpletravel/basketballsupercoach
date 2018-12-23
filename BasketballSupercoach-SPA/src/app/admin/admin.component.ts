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
      // console.log('id value is ' + this.scoringSystem.id);
      // console.log('points value is ' + this.scoringSystem.points);
      // console.log('double double value is ' + this.scoringSystem.doubleDouble); //
      // console.log('orebounds value is ' + this.scoringSystem.dRebounds);
      // console.log('assists value is ' + this.scoringSystem.assists);
      // console.log('blocks value is ' + this.scoringSystem.blocks);
      // console.log('minutes value is ' + this.scoringSystem.minutes);
      // console.log('qd value is ' + this.scoringSystem.quadDouble);
      // console.log('threes value is ' + this.scoringSystem.madeThrees); //
      // console.log('trip value is ' + this.scoringSystem.tripleDouble);
      // console.log('turnover value is ' + this.scoringSystem.turnovers);
    }, error => {

    }, () => {
      // update the form values
      // this.scoringForm.
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
      // console.log('scoring system = ' + this.scoringSystem.orebounds);
      // this.scoringForm.setValue({
      //   points: this.scoringSystem.points,
      //   orebounds: this.scoringSystem.orebounds,
      //   drebounds: this.scoringSystem.drebounds,
      //   assists: this.scoringSystem.assists,
      //   steals: this.scoringSystem.steals,
      //   blocks: this.scoringSystem.blocks,
      //   threes: this.scoringSystem.threes,
      //   turnovers: this.scoringSystem.turnover,
      //   minutes: this.scoringSystem.minutes,
      //   doubledouble: this.scoringSystem.dd,
      //   tripledouble: this.scoringSystem.td,
      //   quaddouble: this.scoringSystem.qd
      // });
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
