import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RunscoresService {
  baseUrl = environment.apiUrl + 'runscores/';

constructor(private http: HttpClient) { }

RunScoresForDate (value: string) {
  // console.log(this.baseUrl);
  return this.http.get<number>(this.baseUrl + value);
}

}