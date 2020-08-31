import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamServiceService } from '../team-service.service';
import { Team } from '../models';
import { EliteApi } from '../elite-api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  tournamentId: string;
  teams: Team[];
  allDivisions: any[];
  queryText: any;
  filteredTeams: any[];
  // allDivisionTeams: _.Dictionary<string | any[]>[];
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private eliteApi: EliteApi) {
    console.log('Teams constructor')
  }

  ngOnInit() {
    this.teams = [];
    console.log('Load Init for Teams')

    this.activatedRoute.params.subscribe(x => {
      this.tournamentId = x.id;
      this.eliteApi.getTournamentData(this.tournamentId).
        subscribe(result => {
          console.log(result);
          this.teams = result.teams;

          this.allDivisions = _.chain(result.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['division', 'divisionTeams'], item))
            .value();
          console.log(this.allDivisions);
          this.filteredTeams = this.allDivisions;
          //this.teams.push(...result.teams.map(x => x as Team))
        });
    });

  }

  itemTapped(teamId: number) {
    console.log('to team home');
    console.log(this.tournamentId);
    console.log(teamId);
    this.router.navigate(['team-home', this.tournamentId, teamId]);
  }
  updateTeams($event) {
    this.filteredTeams = [];
   
    _.forEach(this.allDivisions, division => {
     let filtered = _.filter(division.divisionTeams, dt => dt.name.toLowerCase().includes($event.target.value.toLowerCase()));
     if(filtered.length)
     {
       this.filteredTeams.push({division: division.division, divisionTeams: filtered});
     }
    });
   
  }

}
