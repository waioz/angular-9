import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  faAngleLeft=faAngleLeft
  faAngleRight=faAngleRight
  faAngleDoubleLeft=faAngleDoubleLeft
  faAngleDoubleRight=faAngleDoubleRight
  list_data
  page = 1;
  current = 1;
  totalDocs= 0;
  totalPages= 0;
  startPage=1;
  endPage=1;
  deleteId="";
  delete_btn_loading:Boolean = false;
  pages:any
  search;
  constructor(private common_service:CommonService, private router:Router, public rest:RestService) {
    this.common_service.search_on_change.subscribe(value => {
      console.log(value);
      this.search=value;
      this.getLists(1);
		})
  }

  ngOnInit(){
    this.getLists(1);
  }
  getLists(page)
  {
    let params={
      'page' : page,
      'per_page':12,
      'search': this.search
    };
    this.rest.post('get_lists',params).subscribe((response) => {
      this.list_data = response.data.docs;
      this.current =response.data.page;
      this.totalDocs=response.data.totalDocs;
      this.totalPages=response.data.totalPages;
      if(this.totalPages <= 5) 
      {
        this.startPage = 1;
        this.endPage = this.totalPages;
      } 
      else 
      {
        if (this.current <= 3) {
            this.startPage = 1;
            this.endPage = 5;
        } else if (this.current + 2 >= this.totalPages) {
            this.startPage = this.totalPages - 4;
            this.endPage = this.totalPages;
        } else {
            this.startPage = this.current - 2;
            this.endPage = this.current + 2;
        }
      }
      this.pages = Array.from(Array((this.endPage + 1) - this.startPage).keys()).map(i => this.startPage + i);
    })
  }
  edit(item)
  {
    this.router.navigateByUrl('lists/edit/'+item.id, { state: item });
  }

}
