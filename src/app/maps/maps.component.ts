import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  lat: number = 43.653908;
  faArrowLeft=faArrowLeft;
  lng: number = -79.384293;
  zoom: number = 18;
  constructor(private common_service:CommonService, private router:Router) {
    var map_data = this.router.getCurrentNavigation().extras.state;
    if(typeof map_data!="undefined")
    {
      this.lat=map_data.lat;
      this.lng=map_data.lng;
    }
    this.common_service.search_on_change.subscribe(value => {
      this.lat=value.lat;
      this.lng=value.lng;
		})
  }

  ngOnInit(): void {
  }

}
