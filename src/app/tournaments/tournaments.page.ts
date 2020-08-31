import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EliteApi } from '../elite-api.service';
import { Tournament } from '../models';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit{

  public tournaments : Tournament[]
  constructor(private router: Router,
    private eliteApi : EliteApi,
    private loadingController : LoadingController) {
      this.tournaments = [];
     }

  async ngOnInit() {

    let loader = this.loadingController.create({
      message: 'Loading tournaments...',
      spinner: 'bubbles',
      duration: 2000
    });

    (await loader).present().then(() => {
      this.eliteApi.getTournaments()
      .subscribe( async result =>{ console.log(result);
        this.tournaments.push(...result.map(x => this.getTournament(x)))
        console.log(this.tournaments);
       
      },
      err => {
        console.log("Error encountered while fetching tournaments")
      });
    })
    //console.log('on init for tournaments');
     
    
  }

  getTournament(value: any) : Tournament
  {
    return {
      id: value.id,
      name: value.name
    } as Tournament;
  }
  ngOnDestroy() {
   // console.log('on destroy for tournaments');
  }

  itemTapped(tournament : Tournament) {
    this.router.navigate(['teams', tournament.id]);
  }

  // ionViewWillEnter()
  // {
  //   console.log( "ionViewWillEnter");
  // }

  // ionViewDidEnter() 
  // {
  //   console.log( "ionViewDidEnter");
  // }

  // ionViewWillLeave()
  // {
  //   console.log( "ionViewWillLeave");
  // }

  // ionViewDidLeave() 
  // {
  //   console.log( "ionViewDidLeave");
  // }

}
