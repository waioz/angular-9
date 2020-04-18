import { Component, OnInit } from '@angular/core';
import { faSearch, faBars, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../common.service';

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
  page='lists'
  constructor(private common_service:CommonService) { }

  ngOnInit(): void {
  }
  toggleSidebar()
  {

  }
  set_search(event)
  {
    this.common_service.set_search(event.target.value);
  }
}
