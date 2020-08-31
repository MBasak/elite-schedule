import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.page.html',
  styleUrls: ['./my-teams.page.scss'],
})
export class MyTeamsPage implements OnInit {

  favorites = [];
  constructor(private router: Router,
    private userSettingsService: UserSettingsService) { }
  goToTournament() {
    this.router.navigateByUrl('tournaments');
    console.log("clicked on tournaments");
  }
  ngOnInit() {
   
  }

  ionViewWillEnter()
  {
    this.favorites = this.userSettingsService.getAllFavorites();
  }

  itemTapped(item)
  {
    this.router.navigate(['team-home', item.tournamentId, item.team.id]);
  }
}
