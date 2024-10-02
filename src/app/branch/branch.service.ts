import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Branch from "./branch.model";
import { compose } from "../utils/utils";

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiHost = 'https://api.github.com';
  private path = '/repos/rails/rails/branches';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiHost + this.path);
  }

  filterByProtected(isProtected: boolean): (branchs: Branch[]) => Branch[] {
    return (branchs) => branchs.filter((branch) => branch.protected === isProtected);
  };

}
