import {Component, HostListener, OnInit} from '@angular/core';
import {
	FormBuilder, FormGroup, Validators
} from "@angular/forms";
import {HttpService} from "../http.service";
import {Result} from './result';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
	authControlList: FormGroup;
	result: Result;
	localAuth;
	localStorageData;

	constructor(private formBuilder: FormBuilder, private http: HttpService) {
	}

	// @HostListener('window:unload', ['$event'])
	// unloadHandler(event) {
	// 	localStorage.clear()
	// }


	submit() {

		this.http.postForm('/auth/data', this.authControlList.value).subscribe((result: Result) => this.result = result, () => {
			console.log('error')
		}, () => {
			if (this.result.success != false) {
				localStorage.setItem('user', JSON.stringify({
					realUser: true,
					login: this.result.login,
					name: this.result.name,
					role: this.result.role
				}));
			}
			this.localAuth = JSON.parse(localStorage.getItem('user'));

		});

	}

	clearStorage() {
		localStorage.clear();
		window.location.reload()
	}

	ngOnInit() {
		this.authControlList = this.formBuilder.group({
			login: ['', Validators.required],
			password: ['', Validators.minLength(8)],
		});

		this.localStorageData = JSON.parse(localStorage.getItem('user'));
		if (this.localStorageData) {
			this.localAuth = this.localStorageData;

		}
		console.log(this.localAuth)

	}

}
