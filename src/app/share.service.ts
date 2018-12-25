import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ShareService {
  private cartData: object;
  onClick: EventEmitter<object> = new EventEmitter();

  public addCart(data) {
    this.cartData = data;
    this.onClick.emit(this.cartData);
  }

  constructor() { }

}
