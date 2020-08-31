import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Tournament } from './models';
import { TournamentsPage } from './tournaments/tournaments.page';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EliteApi {
 private baseUrl = 'https://elite-schedule-app-ionic6.firebaseio.com';

  constructor(private httpClient: HttpClient) { }

  getTournaments() : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/tournaments.json`);
    
  }

  getTournamentData(tournamentId : string) : Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`);
    
  }
}
