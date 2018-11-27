import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    // this.loadUser();
  }

  loadUser() {
    console.log('in load user');
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: User) => {
      // appears to return value but is not defined
      this.user = user;

      console.log(user);
      console.log(this.user.teamSelected);
    }, error => {
      this.alertify.error(error);
    });
  }

  teamSelected() {
    if (this.user.teamSelected === 0) {
      return false;
    } else {
      return true;
    }
  }

}
