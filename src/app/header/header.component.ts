import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { faSearch, faBars, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../common.service';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faBars =faBars
  faSearch=faSearch
  faMapMarkerAlt=faMapMarkerAlt
  faArrowRight=faArrowRight
  urlPath=[];
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private common_service:CommonService) {
    
    this.router.events.subscribe((event) => {
		  if (event instanceof NavigationEnd ) {
        this.urlPath = event.url.split('/');
        console.log(this.urlPath)
		  }
		});
  }
  handleAddressChange(event) {
		var value = {}
		value['lat'] = event.geometry.location.lat();
    value['lng'] = event.geometry.location.lng();
    this.common_service.set_search(value);
    if(this.urlPath[1]!="maps")
    {
      this.router.navigateByUrl('maps', { state: value });
    }
	}
  ngOnInit(): void {
  }
  toggleSidebar()
  {
    this.common_service.set_sidebar_toggle();
  }
  set_search(event)
  {
    this.common_service.set_search(event.target.value);
  }
}
