import { Component, OnInit } from '@angular/core';
import { EliteApi } from '../elite-api.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  tournamentId: any = {};
  game: any = {};
  locationId: any = {};
  location: any = {};

  constructor(
    private eliteApi:EliteApi,
    private route: ActivatedRoute
  ) { }
 public map: any= {};
  ngOnInit() {
    this.tournamentId = this.route.params.subscribe(result => {
      this.tournamentId = result.tournamentId;
      this.locationId = result.locationId;
      this.eliteApi.getTournamentData(this.tournamentId).subscribe(data => {
       
        this.location = _.find(data.locations, l => this.locationId);
        console.log(this.location);
        this.map = {
          lat: this.location.latitude,
          lng: this.location.longitude,
          zoom: 12,
          markerLabel: this.location.name
        }
            })
    })
  }

}
