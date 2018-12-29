import { Component, OnInit } from '@angular/core';
import { ScoringsystemService } from '../_services/scoringsystem.service';
import { Scoringsystem } from '../_models/scoringsystem';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RunscoresService } from '../_services/runscores.service';
import { AlertifyService } from '../_services/alertify.service';
import { Round } from '../_models/round';
import { Rundate } from '../_models/runDate';
import { Lockout } from '../_models/lockout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  scoringSystem: Scoringsystem = {};
  scoringForm: FormGroup;
  runscoresForm: FormGroup;
  runteamscoresForm: FormGroup;
  createRoundForm: FormGroup;
  selectedDate: Date;
  newRoundNumber: number;
  newRound: Round = {};
  rd: Rundate = {};
  lockout: Lockout = {};

  constructor(private scoringSystemService: ScoringsystemService, private fb: FormBuilder, private datePipe: DatePipe
    , private runScoresService: RunscoresService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createRunScoresForm();
    this.createRunTeamScoresForm();
    this.createRoundObjectForm();
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

  createRunTeamScoresForm() {
    this.runteamscoresForm = this.fb.group({
      teamDate: ['']
    });
  }

  createRoundObjectForm() {
    this.createRoundForm = this.fb.group({
      roundnumber: [''],
      startdate: [''],
      enddate: ['']
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

  runTeamScores() {
    this.selectedDate = this.runteamscoresForm.get('teamDate').value;
    const latest_date = this.datePipe.transform(this.selectedDate, 'yyyyMMdd');
    console.log('Date formatted for team score: ' + latest_date);
    this.rd.runDate = latest_date;

    this.runScoresService.RunTeamScoresForDate(this.rd).subscribe(next => {
      console.log('run team scores body: ' + next);
    }, error => {
      console.log(error);
    }, () => {
      this.alertify.success('Team Scores Run For Day Successfully');
    });

  }

  createRound() {
    const startDate = this.createRoundForm.get('startdate').value;
    const endDate = this.createRoundForm.get('enddate').value;
    const start_date = this.datePipe.transform(startDate, 'yyyyMMdd');
    const end_date = this.datePipe.transform(endDate, 'yyyyMMdd');

    this.newRound.roundNumber = +this.createRoundForm.get('roundnumber').value;
    this.newRound.startDate = start_date;
    this.newRound.endDate = end_date;

    // console.log('round values: ' + this.newRound.roundNumber + ' start: ' + this.newRound.startDate + ' end: ' + this.newRound.endDate);

    this.runScoresService.CreateNewRound(this.newRound).subscribe(next => {

    }, error => {
      this.alertify.error(error);
    }, () => {
      this.alertify.success('Round Successfully Created');
      // Now need to create all of the TeamScores
      console.log('Round: ' + this.newRound.roundNumber);
      this.runScoresService.CreateTeamScoresForRound(this.newRound).subscribe(next => {

      }, error => {
        this.alertify.error(error);
      }, () => {
        this.alertify.success('Team Scores created successfully');
      });
    });
  }

  setLockout(value: number) {
    // need to update the lockout
    this.lockout.locked = value;

    this.runScoresService.UpdateLockout(this.lockout).subscribe(next => {

    }, error => {
      this.alertify.error(error);
    }, () => {
      this.alertify.success('Lockout updated');
    });
  }

}
