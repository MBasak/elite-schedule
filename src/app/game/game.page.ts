import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EliteApi } from '../elite-api.service';

declare var window: any;
@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  tournamentId: any;
  gameId: any;
  game: any;
 location: any = {};

  constructor(private route: ActivatedRoute,
    private  eliteApi: EliteApi,
    private router: Router) { 
      this.game = {};
    }

  ngOnInit() {
    this.route.params.subscribe( x =>
      {
        this.tournamentId = x.tournamentId;
        this.gameId = +x.gameId;

        this.eliteApi.getTournamentData(this.tournamentId).subscribe( result =>
          {
            this.game = result.games.find(x => x.id === this.gameId);
            this.location = result.locations[this.game.locationId];
            console.log('game page',this.game);
          });
          this.game.gameTime = Date.parse(this.game.time);
      });
  }

  teamTapped(teamId: any)
  {
    this.eliteApi.getTournamentData(this.tournamentId).subscribe( result =>
      {
        let team =  result.teams.find(x => x.id === teamId);

        this.router.navigate(['team-home', this.tournamentId, teamId])
      })
  }
  goToDirections()
  {
window.location = `geo:${this.location.latitude},${this.location.longitude};u=35`;
  }

  goToMap()
  {
    this.router.navigate(['map', this.tournamentId, this.game.locationId]);
  }

  isWinner(score1, score2) 
  {
    return +(score1) > +(score2) ? 'primary' : 'danger';
  }

}
