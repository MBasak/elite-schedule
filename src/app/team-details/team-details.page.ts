import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Team } from '../models';
import { TeamServiceService } from '../team-service.service';
import { EliteApi } from '../elite-api.service';
import * as _ from 'lodash';

import * as moment from 'moment';
import { AlertController, ToastController } from '@ionic/angular';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {
  isFollowing: boolean = false;
  useDateFilter: boolean = false;
  dateFilter: string;
  tournamentId: string;
  teamId: number
  teamName: string;
  teamStanding: any = {};
  team: any = {};
  allGames: any = [];

  games: any[];
  tournamentName: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private eliteApi: EliteApi,
    private alertController: AlertController,
    private toastController: ToastController,
    private userSettings: UserSettingsService) {
    console.log("load team detail from constructor");
  }




  ngOnInit() {
    console.log("team detail ngOninit");

    this.tournamentId = this.route.snapshot.params.tournamentId;
    this.teamId = +this.route.snapshot.params.teamId;


    this.eliteApi.getTournamentData(this.tournamentId).subscribe(result => {
      console.log(result.games);

      this.games = _.chain(result.games)
        .filter(g => g.team1Id === this.teamId || g.team2Id === this.teamId)
        .map(g => {
          let isTeam1 = (g.team1Id === this.teamId);
          let opponentName = isTeam1 ? g.team2 : g.team1;
          let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
          return {
            gameId: g.id,
            opponent: opponentName,
            time: Date.parse(g.time),
            location: g.location,
            locationUrl: g.locationUrl,
            scoreDisplay: scoreDisplay,
            homeAway: (isTeam1 ? 'vs.' : 'at')
          };
        })
        .value();
      console.log(this.games);

      this.teamStanding = _.find(result.standings, { 'teamId': this.teamId })
      console.log('Standing', this.teamStanding);
      this.team = _.find(result.teams, { 'id': this.teamId });
      console.log('Team', this.team);
      this.allGames = this.games;
      this.userSettings.isFavorite(this.teamId.toString()).then(value => {
        this.isFollowing = value;
      }
        
      );
      this.tournamentName =  result.tournament.name;
    });
  }
  getScoreDisplay(isTeam1: boolean, team1Score: any, team2Score: any) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = +teamScore > +opponentScore ? 'W: ' : 'L: ';
      return winIndicator + teamScore + '-' + opponentScore;

    }
    else {
      return '';
    }
  }

  dateFilterChanged($event) {

    console.log('in date time');
    let date = Date.parse($event);
    console.log(date);
    this.games = _.filter(this.allGames, g => moment(g.time).isSame(date, 'day'));
    console.log(this.games);
  }

  setAllGames() {
    if (!this.useDateFilter) {
      this.games = this.allGames;
    }
  }

  gameClicked(game) {

    this.router.navigate(['game', this.tournamentId, game.gameId]);

  }

  toggleUseDataFilter() {
    this.useDateFilter = !this.useDateFilter;
  }
  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getWinLossColor(game) {
    return game.scoreDisplay.indexOf('W') === 0 ? 'primary' : 'danger';
  }

  async toggleFollow() {
    if (this.isFollowing) {
      const alert = await this.alertController.create({
        header: 'Unfollow?',
        message: 'Are you sure you want to follow?',
        buttons: [
          {
            text: 'Yes',
            handler: async () => {
              console.log("clicked yes");
              this.isFollowing = false;

              this.userSettings.unfavoriteTeam(this.teamId);
              const toast = await this.toastController.create({
                message: 'You have unfollowed this team',
                duration: 2000
              })
              await toast.present(); 
            }
          },
          {
            text: 'No'
          }
        ]
      });
      await alert.present();
    }


    else {
      this.userSettings.favoriteTeam(this.team, this.tournamentId, this.tournamentName);

      const toast = await this.toastController.create({
        message: 'You are now following this team',
        duration: 2000
      })
      await toast.present(); 
      this.isFollowing = true;

    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);

   
  }
}
