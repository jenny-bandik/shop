import { Component, OnInit } from '@angular/core';
import {Result} from "./result";
import {HttpService} from "../http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
	subscriptionControlList: FormGroup;
	result: Result;

  constructor(private formBuilder: FormBuilder, private http: HttpService) { }

	submit() {

		this.http.postForm('/subscribtion/data', this.subscriptionControlList.value).subscribe((result: Result) => this.result = result, () => {
			console.log('error')
		});

	}

  ngOnInit() {
	this.subscriptionControlList = this.formBuilder.group({
		mail: ['', Validators.email]
	});

}

}
