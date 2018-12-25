import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Result} from "./result";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.scss']
})
export class MailingComponent implements OnInit {

	mailingControlList: FormGroup;
	result: Result;

	constructor(private formBuilder: FormBuilder, private http: HttpService) { }

	submit() {

		this.http.postForm('/mailing/data', this.mailingControlList.value).subscribe((result: Result) => this.result = result, () => {
			console.log('error')
		});

	}

	ngOnInit() {
		this.mailingControlList = this.formBuilder.group({
			message: ['', Validators.required]
		});

	}
}
