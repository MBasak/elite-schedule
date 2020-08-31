import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private storage: Storage) { }
  favoriteTeam(team, tournamentId, tournamentName) {
    let item ={team: team, tournamentId: tournamentId, tournamentName: tournamentName};
    this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavoriteTeam(team)
  {
    this.storage.remove(team.id.toString());
  }

  isFavorite(teamId: string) : Promise<boolean> {
    return this.storage.get(teamId.toString()).then(value => value);
  }

  getAllFavorites()
  {
    let results =[];
    this.storage.forEach( data => 
      {
        results.push(JSON.parse(data));
      });
      return results;
  }
}


