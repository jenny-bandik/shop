import {Component, OnInit} from '@angular/core';
import {Categories} from './categories';
import {HttpService} from '../http.service';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
	id: number;
	categories: Categories;


	constructor(private httpService: HttpService) {

	}

	ngOnInit() {
		this.httpService.getMenu().subscribe((categories:Categories) => this.categories = categories)
	}

}
