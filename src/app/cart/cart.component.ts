import {Component, Input, OnInit} from '@angular/core';
import {ShareService} from "../share.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	catalogData:object;
	currentCart: String;
  constructor(private share: ShareService) {
	  this.share.onClick.subscribe(data=>this.catalogData = data, ()=>{
	    console.log('error')
    }, () => {

    });

  }

  ngOnInit() {

  }

}
