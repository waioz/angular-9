import { Component, OnInit } from '@angular/core';
import { faGithub, faSlack } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  faGithub = faGithub;
  faSlack = faSlack;
  constructor() { }

  ngOnInit(): void {
  }

}
