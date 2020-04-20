import { Component, OnInit } from '@angular/core';
import { faGithub, faSlack } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../common.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  faGithub = faGithub;
  faSlack = faSlack;
  faLink=faLink;
  domain = "";
  constructor(private common_service:CommonService) {
    this.domain = environment.domain;
  }

  ngOnInit(): void {
  }
  toggleSidebar()
  {
    this.common_service.set_sidebar_toggle();
  }
}
