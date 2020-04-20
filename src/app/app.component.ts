import { HostListener, Component } from '@angular/core';
import { faTimes,faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faTimes = faTimes;
  faEllipsisV=faEllipsisV;
  title = 'waioz-angular-v9';
  isMobile: boolean = false;
  _mode = "over";
  _opened: boolean = false;
  _content_class=""
  _class="sidebar-container col-xs-12 p-0 white border-right";
  public innerWidth: any;

  constructor(private common_service:CommonService) {
    this.common_service.toggle_sidebar.subscribe(value => {
      this._toggleSidebar();
    })
  }
  set_mobile_config()
  {
    this.isMobile = true;
  }
  remove_mobile_config()
  {
    this.isMobile = false;
  }
  ngOnInit() {
    this.set_config();
  }
  set_config()
  {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth<=767)
    {
      this.set_mobile_config();
    }
    else
    {
      this.remove_mobile_config();
    }
  }
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event) {
    this.set_config();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.set_config();
  }
  _toggleSidebar() {
    this._opened = !this._opened;
  }
}
