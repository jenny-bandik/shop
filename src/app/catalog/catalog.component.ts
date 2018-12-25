import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpService} from "../http.service";
import {Catalog} from "./Catalog";
import {ActivatedRoute, Router, Event, ActivationEnd, ActivationStart} from "@angular/router";
import {Location} from "@angular/common";
import {Subscription} from 'rxjs';
import {ShareService} from "../share.service";

@Component({
	selector: 'app-catalog',
	templateUrl: './catalog.component.html',
	styleUrls: ['./catalog.component.scss']
})


export class CatalogComponent implements OnInit {
	exportCartData: {};
	count:number=1;

	id: number;
	catalog: Catalog;
	subscription: Subscription;
	url: String;

	constructor(
		private httpService: HttpService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private share: ShareService) {

		this.share.onClick.subscribe(data => this.exportCartData = data);
		this.subscription = route.params.subscribe(params => this.id = params['id']);

	}

	public addCart() {
		let data = {price:this.catalog[0].price,
		count:this.count};

		this.share.addCart(data)
	}

	changeCount(val) {
		this.count = val;
	}

	getData(url) {
		this.httpService.getCatalog(url).subscribe((catalog: Catalog) => this.catalog = catalog)
	}

	ngOnInit() {
		this.getData('category/' + this.id);
		this.router.events.subscribe((event: Event) => {
			this.url = '';
			if (event instanceof ActivationStart) {
				if (event.snapshot.url.length > 0) {
					event.snapshot.url.forEach((el, i) => {
						this.url = this.url + '/' + el.path
					});
					this.getData(this.url.slice(1))
				}

			}

		})


	}

}
