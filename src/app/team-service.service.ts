import { Injectable } from '@angular/core';
import { Team } from './models';

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {

  teams: Team[];
  constructor() {
    this.teams = [
      { id: 1, name: 'Royal Knight Riders', division:'ffg',coach:'faerf' },
      { id: 2, name: 'Delhi Daredevils', division:'ffg',coach:'faerf'},
      { id: 3, name: 'Rajasthan Royals', division:'ffg',coach:'faerf' }
    ];
  }

  getTeam(id: Number): Team {
    return this.teams.find(x => x.id == id)
  }

  getAllTeams() : Team[]

{
  return this.teams;

}
}
