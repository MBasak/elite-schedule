import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamServiceService } from '../team-service.service';
import { Team, Game } from '../models';
import { EliteApi } from '../elite-api.service';


@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
})
export class TeamHomePage implements OnInit {

  tournamentId : string;
  teamId: number
  teamName: string;
  
  
 
  constructor(private router: Router,
    private route: ActivatedRoute,
    private eliteApi: EliteApi) {
      console.log('COnstructor for Team home');
    }
    
   

  ngOnInit() {
    console.log('ngOnInit for Team home');
    this.route.params.subscribe( params =>
      {
        this.tournamentId = params.tournamentId;
        this.teamId = params.teamId;
      //  this.router.navigate(['team-details',this.tournamentId, this.teamId]);
      this.eliteApi.getTournamentData(this.tournamentId).subscribe( result => {
        this.teamName = result.teams.find(x => x.id === +this.teamId).name;
      })
      })
      
  }

  ionViewDidEnter()
  {
    
  }

  clickOnStandings()
  {
    console.log('to Standings');
    console.log(this.route)
this.router.navigate(['./standings'],  {relativeTo: this.route});
console.log(this.route);
  }

  clickOnTeamDetail()
  {
    console.log('to teamDetails');
    console.log(this.route);
//this.router.navigate(['team-details',this.tournamentId, this.teamId]);
this.router.navigate(['./team-details']);
console.log(this.route);
  }

  goHome()
  {
    this.router.navigate(['']);
  }
}
