import { Component, OnInit } from '@angular/core';
import {
	FormBuilder, FormGroup, Validators
} from "@angular/forms";
import {HttpService} from "../http.service";

import {Result} from './result'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	registControlList: FormGroup;
	result: Result;

	submit() {
	  console.log(this.registControlList.value)
		this.http.postForm('/registration/data', this.registControlList.value).subscribe((result: Result) => this.result = result);

	}

  constructor(private formBuilder: FormBuilder, private http: HttpService) {
	  this.registControlList = this.formBuilder.group({
      name: '',
      mail: ['', Validators.email],
		  login: ['', Validators.required],
		  password: ['', Validators.minLength(8)],
	  });
  }

  ngOnInit() {
  }

}
