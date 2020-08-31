import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {IonicStorageModule} from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AgmCoreModule} from '@agm/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MyTeamsPage } from './my-teams/my-teams.page';
import { TournamentsPage } from './tournaments/tournaments.page';
import { TeamDetailsPage } from './team-details/team-details.page';
import { TeamsPage } from './teams/teams.page';
import { StandingsPage } from './standings/standings.page';
import { TeamHomePage } from './team-home/team-home.page';
import { HttpClientModule } from '@angular/common/http';
import { GamePage } from './game/game.page';
import { UserSettingsService } from './user-settings.service';
import { MapPage } from './map/map.page';


@NgModule({
  declarations: [AppComponent,
  MyTeamsPage,
TournamentsPage,
TeamDetailsPage,
TeamsPage,
StandingsPage,
TeamHomePage,
GamePage,
MapPage
],
  entryComponents: [
  MyTeamsPage,
TournamentsPage,
TeamDetailsPage,
TeamsPage,
StandingsPage,
TeamHomePage,
GamePage,
MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'YOUR_KEY'})
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserSettingsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
