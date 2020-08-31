import { Component, OnInit } from '@angular/core';
import { Team } from '../models';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamServiceService } from '../team-service.service';
import { EliteApi } from '../elite-api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
})
export class StandingsPage implements OnInit {

  team: Team
  tournamentId: any;
  teamId: number;
  allStandings: void[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private eliteApi: EliteApi) {
    
    
   
  }

  ngOnInit() 
  {
    this.tournamentId = this.route.snapshot.params.tournamentId;
        this.teamId = +this.route.snapshot.params.teamId;
      
    
    this.eliteApi.getTournamentData(this.tournamentId).subscribe( result => {
      console.log(result.standings);

      this.allStandings = _.chain(result.standings)
      .groupBy('division')
      .toPairs()
      .map( item => {
        _.zipObject(['division, divisionStandings'], item);
      })
      .value();

      console.log(this.allStandings);
      console.log(result.standings);
  })

}
}
