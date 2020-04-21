import { Component, OnInit } from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../../rest.service';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css']
})
export class UpdateListComponent implements OnInit {
  _action="Add";
  faArrowLeft=faArrowLeft
  formValues: Object = {};
  update_movie: Object = {
    disabled:false,
    loading:false
  };
  update_movie_poster: Object = {
    disabled:false,
    loading:false
  };
  delete_movie: Object = {
    disabled:false,
    loading:false
  };
  urlPath
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private imageCompress: NgxImageCompressService, private rest:RestService) {
    this.router.events.subscribe((event) => {
		  if (event instanceof NavigationEnd ) {
        this.urlPath = event.url.split('/');
        if(this.urlPath[2]=="edit")
        {
          var list_data = this.router.getCurrentNavigation().extras.state;
          if(typeof list_data=="undefined")
          {
            this.getList();
          }
          else
          {
            this.formValues = list_data
          }
          this._action="Edit";
        }
		  }
		});
  }
  deleteList()
  {
    this.rest.post('delete_list',{id:this.urlPath[3]}).subscribe((response) => {
      this.router.navigateByUrl('lists');
    })    
  }
  getList()
  {
    this.rest.post('get_lists',{id:this.urlPath[3],pagination:"false"}).subscribe((response) => {
      this.formValues = response.data.lists[0];
    })
  }
  ngOnInit(){
  }
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  imgSizeBeforeCompress:string;
  imgSizeAfterCompress:string;
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  compressFile() {
    this.update_movie['disabled']=true;
    this.update_movie_poster['loading']=true;
    this.update_movie_poster['disabled']=true;
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imgResultBeforeCompress = image;
      this.imgSizeBeforeCompress = this.formatBytes(this.imageCompress.byteCount(image))      
      this.imageCompress.compressFile(image, orientation, 50, 90).then(
        result => {
          this.update_movie['disabled']=false;
          this.update_movie_poster['loading']=false;
          this.update_movie_poster['disabled']=false;
          this.imgResultAfterCompress = result;
          this.imgSizeAfterCompress = this.formatBytes(this.imageCompress.byteCount(result))
        }
      );
    }); 
  }

  formSubmit()
  {
    this.update_movie['loading']=true;
    this.update_movie['disabled']=true;
    this.formValues['type']=this._action.toLowerCase();
    var formData = new FormData();
    formData.append("poster",this.imgResultAfterCompress);
    this.rest.upload('update_list',formData,this.formValues).subscribe((response) => {
      this.update_movie['loading']=false;
      this.update_movie['disabled']=false;
      this.router.navigateByUrl('lists');
    })
  }
}
