import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(id): Observable<User> {
    console.log('inside getUser- userservice');
    console.log(this.baseUrl + 'users/' + id); // this is correct
    // console.log(this.http.get<User>(this.baseUrl + 'users/' + id)); // this is just an observable
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateSalarySet(user: User) {
    console.log('inside user service: ' + this.baseUrl + 'users/' + user);


    console.log('inside user service: ' + this.baseUrl + 'users/' + user);
    return this.http.put<User>(this.baseUrl + 'users/' + user.id, user);
  }
}
