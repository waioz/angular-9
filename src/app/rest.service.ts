import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../environments/environment';

const httpOptions = {
  headers: new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class RestService {
  urls: Object = {
    get_lists: 'list/get_lists',
    update_list: 'list/update_list',
    delete_list: 'list/delete_list'
  };
  restUrl: String = '';
  constructor(private http: HttpClient) { 
    this.restUrl =environment.apiUrl
  }

  getUrl (urlKey) {
  	const uri = this.urls[urlKey]
  	const url = this.restUrl + uri
  	return url
  }

  post(urlKey, params): Observable<any> {
    params = JSON.stringify(params);
  	const url = this.getUrl(urlKey)
    return this.http.post(url, {params}, httpOptions).pipe(
      map(this.extractData));
  }
  upload(urlKey, formData, params): Observable<any> {
    formData.append('params', JSON.stringify(params))
    const url = this.getUrl(urlKey)
    return this.http.post(url, formData, httpOptions).pipe(
      map(this.extractData));
  }
  post_upload(urlKey, params): Observable<any> {
    params = JSON.stringify(params);
  	const url = this.getUrl(urlKey)
    return this.http.post(url, params, httpOptions).pipe(
      map(this.extractData));
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}