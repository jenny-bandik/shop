import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}
	getMenu(){
    return this.http.get('menu')
	}
	getCatalog(url){
		return this.http.get(url+'/data')
	}
	postForm(url, data){

		return this.http.post(url, data)
	}
}
