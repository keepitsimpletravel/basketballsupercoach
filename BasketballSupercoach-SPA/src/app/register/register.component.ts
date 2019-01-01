import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { TeamsalaryService } from '../_services/teamsalary.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    //   confirmPassword: new FormControl('', Validators.required),
    //   email: new FormControl('', Validators.required),
    //   name: new FormControl('', Validators.required),
    //   teamname: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      teamname: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    console.log('Registering');
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      console.log('Registering 2');
      this.authService.register(this.user).subscribe(() => {
        console.log('Registering 3');
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          console.log('Registering 4');
          this.router.navigate(['/dashboard']);
          console.log('Registering 5');
        });
      });
    }
    // this.authService.register(this.model).subscribe(() => {
    //   // this.createTeamSalary();
    //   this.alertify.success('registration successful');
    // }, error => {
    //   this.alertify.error(error);
    // });
    // console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  // createTeamSalary() {
  //   // Need to get the users id and pass in
  //   this.teamSalaryService.createTeamSalary(this.authService.decodedToken.nameid).subscribe(() => {
  //     this.alertify.success('teams salary created');
  //   }, error => {
  //       this.alertify.error(error);
  //   });
  // }

}
