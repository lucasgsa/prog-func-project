import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Branch from "./branch.model";

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiHost = 'https://api.github.com';
  private path = '/repos/rails/rails/branches?per_page=100';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiHost + this.path);
  }

}
