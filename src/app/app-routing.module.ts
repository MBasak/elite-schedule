import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, ExtraOptions } from '@angular/router';
import { MyTeamsPage } from './my-teams/my-teams.page';
import { TournamentsPage } from './tournaments/tournaments.page';
import { TeamsPage } from './teams/teams.page';
import { TeamDetailsPage } from './team-details/team-details.page';
import { StandingsPage } from './standings/standings.page';
import { TeamHomePage } from './team-home/team-home.page';
import { GamePage } from './game/game.page';
import { MapPage } from './map/map.page';

const routes: Routes = [
  {path: '', component: MyTeamsPage},
  {path:'tournaments', component:TournamentsPage},
  {
    path: 'teams/:id',
    component:TeamsPage
  },
 {
  path: 'game/:tournamentId/:gameId',
  component: GamePage
 },
 
  {
    path: 'team-home/:tournamentId/:teamId',
    component: TeamHomePage,
    children : [
      {
    
          path: 'team-details',
          
          component: TeamDetailsPage
      },
      {
    
        path: 'standings',
        
        component: StandingsPage
      
    },
    {
      path:'',
      redirectTo: 'team-details',
      pathMatch: 'full'
    }
    //  {
    //   path: '',
    //   redirectTo: '/(team-details/:tourneyId/:teamId',
    //   pathMatch: 'full'
    //  }
    ]
  },
  {
    path: 'map/:tournamentId/:locationId',
    component: MapPage
  }
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};
@NgModule({
  imports: [
    RouterModule.forRoot(routes, routingConfiguration)
  ],
  
  
  exports: [RouterModule]
})
export class AppRoutingModule {}
