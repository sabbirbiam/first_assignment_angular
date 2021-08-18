import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { appConfig } from './app.config';
import { WebStorageService } from '../core/services/web-storage.service';
@Injectable({
	providedIn: 'root'
})

export class BaseDataService {

	// constructor
	private token = "";
	// private token =localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : undefined;

	constructor(
		private http: HttpClient,
		private webStorageService: WebStorageService
		) {
		
		this.token = this.webStorageService.getToken();
	}
	get(route: string, data?: any) {
		console.log("route", route);
		let header;
		if (route != 'login'){
			header = (this.token) ? { Authorization: `Bearer ${this.token}` } : undefined;
		}

		let params = new HttpParams();
		if (data !== undefined) {
			Object.getOwnPropertyNames(data).forEach(key => {
				params = params.set(key, data[key]);
			});
		}

		return this.http.get(`${appConfig.apiUrl}/${route}`, {
			responseType: 'json',
			headers: header,
			params
		});
	}
	request(method: string, route: string, data?: any) {
		if (method === 'GET') {
			return this.get(route, data);
		}

		const header = (this.token) ? { Authorization: `Bearer ${this.token}` } : undefined;

		return this.http.request(method, `${appConfig.apiUrl}/${route}`, {
			body: data,
			responseType: 'json',
			observe: 'body',
			headers: header
		});
	}
}
